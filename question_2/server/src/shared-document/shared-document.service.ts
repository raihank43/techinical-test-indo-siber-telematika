import { HttpException, Injectable } from '@nestjs/common';
import { ILoginData } from 'src/interfaces/login.data';
import { ShareDocumentDto } from './dto/share-document.dto';
import { PrismaService } from 'src/prisma.service';
import { Document, SharedDocument } from '@prisma/client';
import { ISharedDocument } from 'src/interfaces/shared-document.interface';

@Injectable()
export class SharedDocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserSharedDocument(user: ILoginData): Promise<ISharedDocument[]> {
    return this.prismaService.sharedDocument.findMany({
      where: { userId: user.id },
      include: {
        document: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async shareDocument(
    user: ILoginData,
    data: ShareDocumentDto,
  ): Promise<
    { message: string; sharedDocument: SharedDocument } | HttpException
  > {
    const document = await this.prismaService.document.findUnique({
      where: { id: Number(data.documentId) },
    });

    if (!document) {
      throw new HttpException('Document not found', 404);
    }

    if (document.userId !== user.id) {
      throw new HttpException('You are not the owner of this document', 403);
    }

    if (
      document.id === Number(data.documentId) &&
      user.id === Number(data.targetUserId)
    ) {
      throw new HttpException('You cannot share a document with yourself', 400);
    }

    // if the document is already shared with the target user
    const isShared = await this.prismaService.sharedDocument.findFirst({
      where: {
        documentId: Number(data.documentId),
        userId: Number(data.targetUserId),
      },
    });

    if (isShared) {
      throw new HttpException(
        'This document is already shared with the target user',
        400,
      );
    }

    const sharedDocument = await this.prismaService.sharedDocument.create({
      data: {
        documentId: Number(data.documentId),
        userId: Number(data.targetUserId), // This shouldd be the target user's ID
      },
    });

    return {
      message: 'Document shared successfully',
      sharedDocument,
    };
  }
}
