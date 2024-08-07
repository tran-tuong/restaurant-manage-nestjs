import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty({
    description: 'Name of dish',
    example: 'Banh mi',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of dish',
    example: 'Bread, Pork, Beef, Sausage',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Category of dish',
    example: 'food',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Price of dish',
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Quantity of dish',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}