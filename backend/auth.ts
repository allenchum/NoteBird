import * as passport from 'passport'
import * as passportJWT from 'passport-jwt';
import config from './config';
//import { knex } from './dbConnect'
import users from './users';

const ExtractJwt = passportJWT.ExtractJwt;

export default function(){
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        const user = users.find((user)=>{
            return user.id == payload.id
        });
        if (user) {
            return done(null, {id: user.id});
        } else {
            return done(new Error("User not found"), null);
        }
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
