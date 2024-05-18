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
import { RegisterDto } from './dto/register.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
