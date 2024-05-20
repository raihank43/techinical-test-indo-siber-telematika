import { diskStorage } from 'multer';
import * as path from 'path';
import * as multer from 'multer';
export const multerConfig = {
  storage: multer.memoryStorage(),
};
