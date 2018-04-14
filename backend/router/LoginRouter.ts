import * as express from 'express'
import * as jwt from 'jwt-simple';
import axios from 'axios';
import config from '../config';
import { knex } from '../dbConnect'

class LoginRouter {
  router = () => {
    const router = express.Router();
    router.post("/", this.loginFn)
    return router;
  }

  // function to get/post, please update the below using promise/transaction
  private loginFn = (req: express.Request, res: express.Response) => {
    if (req.body.access_token) {
      var accessToken = req.body.access_token;
      console.log(accessToken)
      axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,gender,last_name,first_name,picture.width(960).height(960)`)
        .then((data) => {
          if (!data.data.error) {
            let query = knex.select("id").from("users").where("users.facebookID", data.data.id);
            query.then((rows) => {
              if (rows.length >= 1) {
                console.log("user exists, update profile pic link..")
                var payload = {
                  id: rows[0].id //use facebookID as payload
                }
                var token = jwt.encode(payload, config.jwtSecret);
                console.log(token)
                res.json({
                  token: token,
                  userID: rows[0].id,
                });
                // profPicLink update with token change, update table each time the user login to app
                return knex("users").where('facebookID', '=', data.data.id)
                .update("profPicLink", data.data.picture.data.url)
              } else {
                console.log("Add user info to database..")
                // add user to table
                return knex.insert({
                  firstName: data.data.first_name,
                  lastName: data.data.last_name,
                  gender: data.data.gender,
                  email: data.data.email,
                  facebookID: data.data.id,
                  profPicLink: data.data.picture.data.url
                }, "id").into("users")
                  .then((ids)=>{
                    var payload = {
                      id: ids[0] //use facebookID as payload
                    }
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                      token: token,
                      userID: ids[0],
                    });
                });
              }
            });
          } else {
            res.sendStatus(401);
          }
        }).catch((err) => {
          console.log(err);
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  }


}

export { LoginRouter };
