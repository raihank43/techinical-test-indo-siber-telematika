import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, DocumentModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
