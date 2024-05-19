import { Module } from '@nestjs/common';
import { SharedDocumentService } from './shared-document.service';
import { SharedDocumentController } from './shared-document.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SharedDocumentController],
  providers: [SharedDocumentService],
})
export class SharedDocumentModule {}
