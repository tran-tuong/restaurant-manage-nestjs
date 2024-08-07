import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/enitites/user.entity';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Order } from './entities/order.entity';
import { UpdateOrderStatusDto } from './dto/order-update-status.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create')
  @ApiOperation({ summary: 'User and Admin' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ) {
    return this.orderService.createOrder(createOrderDto, user);
  }

  @Get('/get')
  @ApiOperation({ summary: 'Admin only' })
  @ApiResponse({ status: 200, description: 'Return all orders' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Admin and user' })
  @ApiParam({ name: 'id', required: true, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Return the order with the specified ID' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Admin and user' })
  @ApiParam({ name: 'id', required: true, description: 'Order ID' })
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOrder(
    @Param('id') id: number,
    @Body() UpdateOrderStatusDto: Partial<UpdateOrderStatusDto>,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, UpdateOrderStatusDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Admin and user' })
  @ApiParam({ name: 'id', required: true, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
