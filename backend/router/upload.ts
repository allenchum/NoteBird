import * as express from 'express';
import * as multer from 'multer'
import * as path from 'path'
import { knex } from '../dbConnect'

// set storage engine
const storage = multer.diskStorage({
  destination: 'backend/upload',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname))
  }
})

// check file type
function checkFileType(file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error ('Error: Images only'), false);
  }
}

// class UploadImage {
//   router = () => {
//     const router = express.Router();
//     router.post('/', /*auth.authenticate(),*/ this.upload);
//     return router;
//   }
//
// // upload image to drive
// // save image path to database
// // render the image top html
//   private upload = (req: express.Request, res: express.Response) => {
//     knex.insert("*")
//       .into('notes');
//     })
//   }
//
// }



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('imageUpload')
