import { RegisterDto } from '../user/dto/user-register.dto';
import { User } from '../user/enitites/user.entity';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, confirm } = registerDto;
    if (password !== confirm) {
      throw new BadRequestException('Password and confirm password do not match');
    }
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const user = await this.userService.create({
      username,
      email,
      password,
    });
    return user;
  }
}
