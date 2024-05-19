interface IUser {
  id: number;
  email: string;
  name: string;
}

interface IDocument {
  id: number;
  title: string;
  documentUrl: string;
  docType: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: IUser;
}

export interface ISharedDocument {
  id: number;
  userId: number;
  documentId: number;
  document: IDocument;
}
