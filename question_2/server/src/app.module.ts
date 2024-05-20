import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { SharedDocumentModule } from './shared-document/shared-document.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    DocumentModule,
    SharedDocumentModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
