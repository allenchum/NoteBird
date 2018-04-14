import * as passport from 'passport'
import * as passportJWT from 'passport-jwt';
import config from './config';
import { knex } from './dbConnect'

const ExtractJwt = passportJWT.ExtractJwt;

export default function(){
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        let query = knex.select("*").from("users").where("id", '=', payload.id);
        query.then((rows)=> {
          if (rows.length >= 1) {
              return done(null, {id: payload.id});
          } else {
              return done(new Error("User not found"), null);
          }
        })
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}
