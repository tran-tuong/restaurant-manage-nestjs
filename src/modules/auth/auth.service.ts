import { User } from './../user/enitites/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../user/dto/user-register.dto';;
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, confirm } = registerDto;
    if (password !== confirm) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
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
  
  async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken};
  }
  async logout(userId: number): Promise<void> {
    await this.userService.removeRefreshToken(userId);
  }
}
