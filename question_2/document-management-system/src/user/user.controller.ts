import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Add this line
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @Post('user')
  async signupUser(@Body() userData: RegisterDto): Promise<UserModel> {
    try {
      return this.userService.createUser(userData);
    } catch (error) {
      return error.message;
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: any) {
    return this.authService.login(user);
  }
}
