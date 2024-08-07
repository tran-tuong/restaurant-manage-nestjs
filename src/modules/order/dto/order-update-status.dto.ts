import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../order-status.enum';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Status of Order',
    example: 'preparing',
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}