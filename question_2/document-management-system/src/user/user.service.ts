import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if (!data.email) {
      throw new BadRequestException({
        status: 400,
        message: 'Email is required',
      });
    }
    if (!data.password) {
      throw new BadRequestException({
        status: 400,
        message: 'Password is required',
      });
    }
    if (!data.name) {
      throw new BadRequestException({
        status: 400,
        message: 'Name is required',
      });
    }

    const findUniqueUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (findUniqueUser) {
      throw new BadRequestException({
        status: 400,
        message: 'User with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
