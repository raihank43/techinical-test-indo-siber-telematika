import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      if (!data.email) {
        throw new Error('Email is required');
      }
      const uniqueEmail = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (uniqueEmail) {
        throw new Error('Email already exists');
      }
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }
}
