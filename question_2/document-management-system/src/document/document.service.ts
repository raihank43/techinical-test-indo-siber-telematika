import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as mime from 'mime-types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async getAllDocuments(): Promise<any> {
    return { message: 'All documents fetched successfully' };
  }

  async uploadDocument(file: any, user: any): Promise<any> {
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
