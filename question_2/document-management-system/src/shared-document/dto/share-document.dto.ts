import { IsNotEmpty } from 'class-validator';

export class ShareDocumentDto {
  @IsNotEmpty()
  readonly documentId: number;

  @IsNotEmpty()
  readonly targetUserId: number;
}
