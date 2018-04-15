import * as express from 'express'
import { knex } from '../dbConnect'

class GetUserRouter {
  router = () => {
    const router = express.Router();
    router.get("/", this.getInfo)
    return router;
  }

  private getInfo = (req: express.Request, res: express.Response) => {
    knex.select("*").from("users").where("users.id", "=", (req.user) ? req.user.id : null)
      .then((rows) => {
        res.json(rows);
      })
  }
}

export { GetUserRouter }
