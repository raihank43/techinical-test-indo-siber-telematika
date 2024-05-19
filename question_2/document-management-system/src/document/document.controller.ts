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
import * as mime from 'mime-types';

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
    const fileName = file.originalname;
    const mimeType = file.mimetype;
    const data = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${mimeType};base64,${data}`;

    // generate randomName for file
    const randomName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Get the extension from the mimetype
    const extensionName = mime.extension(mimeType).split(' ')[0];
    const result = await cloudinary.v2.uploader.upload(dataURI, {
      folder: 'document-management-system',
      resource_type: 'auto',
      public_id: randomName,
      format: extensionName ? extensionName : null, // Check if extension is a string before using it
    });
    return { ...result, message: 'Document uploaded successfully' };
  }
}
