import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'user',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'P12345r@',
    description:
      'User password include uppercase, lowercase, special character, number',
  })
  @IsOptional()
  @IsString()
  password?: string;
}