import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExpressRequest } from 'src/types/express-request.interface';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: number, @Req() req: ExpressRequest) {
    const userId = req.user.userId;
    if (userId != id) {
      throw new UnauthorizedException('You can only delete your own account');
    }
    this.userService.deleteUser(id);
    return { message: 'Delete sucessful' };
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req: ExpressRequest) {
    const userId = req.user.userId;
    if (userId != id) {
      throw new UnauthorizedException('You can only update your own account');
    }
    return this.userService.updateUser(id, updateUserDto);
  }
}
