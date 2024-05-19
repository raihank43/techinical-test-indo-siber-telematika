import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SharedDocumentService } from './shared-document.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller()
export class SharedDocumentController {
  constructor(private readonly sharedDocumentService: SharedDocumentService) {}

  @Get('/shared-document')
  async getSharedDocument(): Promise<string> {
    return this.sharedDocumentService.getSharedDocument();
  }
}
