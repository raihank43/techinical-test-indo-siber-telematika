import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DocumentService } from './document.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [DocumentController],
  providers: [DocumentService, PrismaService],
  exports: [],
})
export class DocumentModule {}
