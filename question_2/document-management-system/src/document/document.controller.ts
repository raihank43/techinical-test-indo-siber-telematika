import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerConfig } from 'src/config/multer.config';
import * as cloudinary from 'cloudinary';
import * as mime from 'mime-types';
import { DocumentService } from './document.service';

@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('document')
  async getUserDocuments(@Request() req: any): Promise<any> {
    return this.documentService.getUserDocuments(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('document')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadDocument(
    @UploadedFile() file,
    @Request() req: any,
  ): Promise<any> {
    return this.documentService.uploadDocument(file, req.user);
  }
}
