import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @Get('user')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    try {
      return this.userService.createUser(userData);
    } catch (error) {
      return error.message;
    }
  }
}
