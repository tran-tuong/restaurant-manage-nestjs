import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order-create.dto';
import { User } from '../user/enitites/user.entity';
import { OrderItem } from './entities/order-items.entity';
import { OrderStatus } from './order-status.enum';
import { UpdateOrderStatusDto } from './dto/order-update-status.dto';



@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    authenticatedUser: User,
  ): Promise<Order> {
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id ${createOrderDto.userId} not found`,
      );
    }
    if (
      authenticatedUser.roles !== 'admin' &&
      authenticatedUser.id !== user.id
    ) {
      throw new UnauthorizedException(
        'You do not have permission to create an order for this user',
      );
    }

    const order = new Order();
    order.user = user;
    order.status = OrderStatus.PENDING;
    order.orderItems = [];

    let totalPrice = 0;

    for (const item of createOrderDto.orderItems) {
      const menu = await this.menuRepository.findOne({
        where: { id: item.menuId },
      });
      if (!menu) {
        throw new NotFoundException(
          `Menu item with id ${item.menuId} not found`,
        );
      }
      if (menu.quantity <= 0) {
        throw new NotFoundException(
          `Menu item with id ${item.menuId} is out of stock`,
        );
      }

      if (menu.quantity < item.quantity) {
        throw new NotFoundException(
          `Not enough quantity for menu item with id ${item.menuId}`,
        );
      }

      const orderItem = new OrderItem();
      orderItem.menu = menu;
      orderItem.quantity = item.quantity;
      orderItem.price = menu.price * item.quantity;
      order.orderItems.push(orderItem);
      totalPrice += orderItem.price;

      menu.quantity -= item.quantity;
      await this.menuRepository.save(menu);
    }

    order.totalPrice = totalPrice;
    return await this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.menu'],
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['user', 'orderItems', 'orderItems.menu'] });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.getOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = updateOrderDto.status;
    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.remove(order);
  }
}
