import { diskStorage } from 'multer';
import * as path from 'path';
export const multerConfig = {
  storage: diskStorage({
    // destination: './document',
    filename: (req, file, cb) => {
      console.log(file, 'file from multer config');
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
