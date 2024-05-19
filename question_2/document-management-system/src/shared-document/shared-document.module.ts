import { Module } from '@nestjs/common';
import { SharedDocumentService } from './shared-document.service';
import { SharedDocumentController } from './shared-document.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [SharedDocumentController],
  providers: [SharedDocumentService, PrismaService],
})
export class SharedDocumentModule {}
