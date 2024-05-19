import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DocumentController],
  providers: [],
  exports: [],
})
export class DocumentModule {}
