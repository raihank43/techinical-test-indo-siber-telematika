import { IDocument } from "./document-interface";
import { IUser } from "./user-interface";

export interface ISharedDocument {
  id: number;
  userId: number;
  documentId: number;
  document: IDocument & { user: IUser };
}
