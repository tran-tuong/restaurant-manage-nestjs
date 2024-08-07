import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/menu-create.dto';
import { UpdateMenuDto } from './dto/menu-update.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';

@ApiTags('Menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Admin only' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 201, description: 'Menu item created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get('/get')
  @ApiOperation({ summary: 'Admin only' })
  @ApiResponse({ status: 200, description: 'Return all menu items' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Admin only' })
  @ApiResponse({ status: 200, description: 'Return the order with the specified ID' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrderById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }


  @Patch('/update/:id')
  @ApiOperation({ summary: 'Admin only, Can update 1 field' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the menu item' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({ status: 200, description: 'Menu item updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateMenu(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Admin only' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the menu item' })
  @ApiResponse({ status: 200, description: 'Menu item deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteMenu(@Param('id') id: number) {
     this.menuService.deleteMenu(id);
    return { message: 'Delete items sucessful' };
  }
}
