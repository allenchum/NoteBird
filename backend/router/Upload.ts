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

const upload = multer({
                storage: storage,
                limits: { fileSize : 2000000 } // max upload size 2MB
               }).single("avatar");


class Upload {
  router = () => {
    const router = express.Router();
    router.post('/', this.uploadFn);
    return router;
  }

  private uploadFn = (req: express.Request, res: express.Response) => {
    console.log(req.body)
    upload(req, res, function(err) {
      // An error occurred when uploading
      if (err) {
        res.json({
          success: false,
          error: "file size too large",
        });
      } else {
      // response success message
        res.json({
          filePath: "/static/" + req.file.filename,
          success: true,
          message: 'Image was uploaded successfully'
        });
      }
    })
  }
}


export { Upload }
