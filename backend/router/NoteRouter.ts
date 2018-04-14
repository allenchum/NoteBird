import * as express from 'express'
import authClass from '../auth';
import { knex } from '../dbConnect'

const auth = authClass();

class NoteRouter {
  router = () => {
    const router = express.Router();
    router.get('/', this.getUsers);
    return router;
  }

  private getUsers = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").then((rows) => {
      res.json(rows);
    })
  }
}

export { NoteRouter };
