import * as express from 'express'
import * as jwt from 'jwt-simple';
import axios from 'axios';
import config from '../config';
import { knex } from '../dbConnect'

class GetUserRouter {
  router = () => {
    const router = express.Router();
    router.get("/", this.getInfo)
    return router;
  }

  private getInfo = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").orderBy("id").then((rows) => {
     res.json(rows);
   })
  }
}

export { GetUserRouter }
