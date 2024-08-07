import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateMenuDto {
  @ApiProperty({
    description: 'Name of dish',
    example: 'Banh mi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of dish',
    example: 'Bread, Pork, Beef, Sausage',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Category of dish',
    example: 'food',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Price of dish',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Quantity of dish',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
