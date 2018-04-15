import * as express from 'express';
import * as multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload')
  },
  filename: function(req, file, cb) {
    cb(null, ((req.user) ? req.user.id : "") + file.fieldname + '-' + Date.now() + '.jpg')
  }
});

const upload = multer({ storage: storage }).single("avatar");


class Upload {
  router = () => {
    const router = express.Router();
    router.post('/', this.uploadFn);
    return router;
  }

  private uploadFn = (req: express.Request, res: express.Response) => {
    upload(req, res, function(err) {
      if (err) {
        // An error occurred when uploading
        throw err;
      }
      res.json({
        filePath: "/static/" + req.file.filename,
        success: true,
        message: 'Image was uploaded successfully'
      });
      // Everything went fine
    })
  }
}


export { Upload }
