import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedDocumentService {
  constructor() {}

  async getSharedDocument(): Promise<string> {
    return 'This is a shared document';
  }
}
