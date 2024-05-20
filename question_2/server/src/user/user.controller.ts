import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RegisterResponse, UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { AuthService, LoginResponse } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // Add this line
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllUsers(@Request() req: any): Promise<UserModel[]> {
    console.log(req.user, '<<<<<<'); // This will log the authenticated user's data
    return this.userService.getAllUsers();
  }

  // Register a new user
  @Post('user')
  async signupUser(@Body() userData: RegisterDto): Promise<RegisterResponse> {
    return this.userService.createUser(userData);
  }

  // Login a user and return a JWT
  @Post('auth/login')
  async login(@Body() user: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
