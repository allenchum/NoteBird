import * as express from 'express'
// import authClass from './auth';
import { knex } from './dbConnect'

class  NoteAndPinRouter  {
  router = () => {
    const router = express.Router();
    router.get('/create', /*auth.authenticate(),*/ this.getNPs);
    return router;
  }

  private getNPs = (req: express.Request, res: express.Response) => {
    console.log(req.body)
  }
}

export { NoteAndPinRouter };
