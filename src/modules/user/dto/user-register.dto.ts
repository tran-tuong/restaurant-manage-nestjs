import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.ultils';
import { Match } from 'src/modules/auth/validators/match.decorator';

export class RegisterDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'user',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password include uppercase, lowercase, special character, number',
    example: 'P12345r@',
  })
  @IsNotEmpty()
  @Length(6, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @ApiProperty({
    example: 'P12345r@',
    description:
      'User password include uppercase, lowercase, special character, number',
  })
  @IsNotEmpty()
  @Length(6, 24)
  @Match('password', { message: 'Password and confirm password do not match' })
  confirm: string;
}
