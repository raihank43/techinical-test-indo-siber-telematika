import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerConfig } from 'src/config/multer.config';
import * as cloudinary from 'cloudinary';

@Controller()
export class DocumentController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('document')
  async getAllDocuments(): Promise<any> {
    return { message: 'All documents fetched successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('document')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadDocument(@UploadedFile() file): Promise<any> {
    console.log(file, 'file');
    const result = await cloudinary.v2.uploader.upload(file.path);
    console.log(result, 'result');
    return result;
  }
}
