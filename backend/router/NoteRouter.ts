import * as express from 'express'
import { knex } from '../dbConnect'

class NoteRouter {
  router = () => {
    const router = express.Router();
    router.get('/', this.getUsers);
    router.get('/user', this.getSpecificUser)
    return router;
  }

  private getUsers = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").then((rows) => {
      res.json(rows);
    })
  }

  private getSpecificUser = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").then((rows) => {
      res.json(rows);
    })
  }

}

export { NoteRouter };
