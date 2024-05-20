import { Document } from '@prisma/client';
export interface IUploadResponse {
  message: string;
  document: Document;
}
