import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: RegisterDto): Promise<RegisterResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new HttpException('User with this email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { id, email, name } = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return {
      message: 'User successfully registered',
      id,
      email,
      name,
    };
  }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', 401);
    }

    const { password: pass, ...result } = user;
    return result;
  }
}

export interface RegisterResponse extends Omit<User, 'password'> {
  message: string;
}
