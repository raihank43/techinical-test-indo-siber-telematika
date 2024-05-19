import { HttpException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as mime from 'mime-types';
import { PrismaService } from 'src/prisma.service';
import { Document, Prisma } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async getUserDocuments(user): Promise<Document[]> {
    const documents = await this.prisma.document.findMany({
      where: {
        userId: user.id,
      },
    });
    return documents;
  }

  async uploadDocument(file: any, user: any): Promise<any> {
    if (!file) {
      return new HttpException('No file uploaded', 400);
    }
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

    // Save the document to the database
    const document = await this.prisma.document.create({
      data: {
        title: fileName,
        documentUrl: result.secure_url,
        userId: user.id,
      },
    });

    return { message: 'Document uploaded successfully', document };
  }
}
