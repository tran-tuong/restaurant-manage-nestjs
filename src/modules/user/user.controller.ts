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
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { RolesGuard } from '../auth/roles/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get')
  @ApiOperation({ summary: 'Admin only, Get all user' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/get/:id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Find user by Id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteUser(@Param('id') id: number, @Req() req: ExpressRequest) {
    const userId = req.user.userId;
    if (userId != id) {
      throw new UnauthorizedException('You can only delete your own account');
    }
    this.userService.deleteUser(id);
    return { message: 'Delete sucessful' };
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Can update 1 field' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Update role to admin roles: admin',
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExpressRequest,
  ) {
    const userId = req.user.userId;
    // if (userId != id ) {
    //   throw new UnauthorizedException('You can only delete your own account');
    // }
    return this.userService.updateUser(id, updateUserDto);
  }
}
