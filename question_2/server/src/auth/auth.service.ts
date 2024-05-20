// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserData: LoginUserDto): Promise<LoginResponse> {
    // find user in DB
    const user = await this.userService.findByLogin(loginUserData);

    // create jwt
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export interface LoginResponse {
  access_token: string;
}