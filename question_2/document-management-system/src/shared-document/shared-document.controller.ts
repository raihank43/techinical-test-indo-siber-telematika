import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SharedDocumentService } from './shared-document.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ShareDocumentDto } from './dto/share-document.dto';
import { SharedDocument } from '@prisma/client';
import { ISharedDocument } from 'src/interfaces/shared-document.interface';

@UseGuards(JwtAuthGuard)
@Controller()
export class SharedDocumentController {
  constructor(private readonly sharedDocumentService: SharedDocumentService) {}

  @Get('/shared-document')
  async getUserSharedDocument(@Request() req: any): Promise<ISharedDocument[]> {
    return this.sharedDocumentService.getUserSharedDocument(req.user);
  }

  @Post('/share-document')
  async shareDocument(
    @Request() req: any,
    @Body() shareDocInput: ShareDocumentDto,
  ): Promise<
    { message: string; sharedDocument: SharedDocument } | HttpException
  > {
    return await this.sharedDocumentService.shareDocument(
      req.user,
      shareDocInput,
    );
  }
}
