import { HttpException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as mime from 'mime-types';
import { PrismaService } from 'src/prisma.service';
import { Document, Prisma } from '@prisma/client';
import { ILoginData } from 'src/interfaces/login.data';
import { IData } from 'src/interfaces/file.interface';
import { IUploadResponse } from 'src/interfaces/uploadResponse.interface';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async getUserDocuments(
    user: ILoginData,
    orderBy: 'asc' | 'desc',
    sortBy: 'title' | 'createdAt' = 'createdAt',
  ): Promise<Document[]> {
    if (!orderBy) {
      orderBy = 'asc';
    }
    const documents = await this.prisma.document.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        [sortBy]: orderBy,
      },
    });
    return documents;
  }

  async uploadDocument(
    file: IData,
    user: ILoginData,
  ): Promise<IUploadResponse | HttpException> {
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

  async deleteDocument(
    documentId: number,
    user: ILoginData,
  ): Promise<{ message: string; document: Document }> {
    const document = await this.prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (!document) {
      throw new HttpException('Document not found', 404);
    }

    if (document.userId !== user.id) {
      throw new HttpException('Unauthorized', 401);
    }

    // Delete the file from Cloudinary
    // get the public_id from the documentUrl
    const parts = document.documentUrl.split('/');
    const publicId = `document-management-system/${
      parts[parts.length - 1].split('.')[0]
    }`;
    await cloudinary.v2.uploader.destroy(publicId);

    // Delete the document from the database
    await this.prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    return { message: 'Document deleted successfully', document };
  }
}
