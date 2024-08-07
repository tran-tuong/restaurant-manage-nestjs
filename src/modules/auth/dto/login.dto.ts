import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P12345r@',
    description:
      'User password include uppercase, lowercase, special character, number',
  })
  @IsNotEmpty()
  @Length(6, 24)
  password: string;
}
