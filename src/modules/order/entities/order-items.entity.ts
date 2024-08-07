import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Order } from './order.entity';
import { Menu } from 'src/modules/menu/entities/menu.entity';

  
  @Entity()
  export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    order: Order;
  
    @ManyToOne(() => Menu, (menu) => menu.id, { onDelete: 'CASCADE' })
    menu: Menu;
  
    @Column()
    quantity: number;
  
    @Column()
    price: number;
  }