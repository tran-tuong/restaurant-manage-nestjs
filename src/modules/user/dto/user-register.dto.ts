import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.ultils';
import { Match } from 'src/modules/auth/validators/match.decorator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @IsNotEmpty()
  @Length(6, 24)
  @Match('password', { message: 'Password and confirm password do not match' })
  confirm: string;
}
