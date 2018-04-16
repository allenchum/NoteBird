import * as express from 'express'
import { knex } from '../dbConnect'

class GetUserRouter {
  router = () => {
    const router = express.Router();
    router.get("/", this.getInfo);
    router.get('/user/:id', this.getSpecificUser)
    return router;
  }

  private getInfo = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").where("users.id", "=", (req.user) ? req.user.id : null)
      .then((rows) => {
        res.json(rows);
      })
  }

  private getSpecificUser = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").where("users.id", "=", req.params.id)
      .then((rows) => {
        res.json(rows);
      })
  }


}

export { GetUserRouter }
