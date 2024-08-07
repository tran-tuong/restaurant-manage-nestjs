import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    description: 'Dish id to choose',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  menuId: number;

  @ApiProperty({
    description: 'Quantity to buy',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'User to buy',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ApiProperty({ type: [OrderItemDto], description: 'List of order items' })
  orderItems: OrderItemDto[];
}
