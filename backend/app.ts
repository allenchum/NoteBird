import * as express from 'express';
import * as bodyParser from 'body-parser';
import authClass from './auth';
import * as cors from 'cors';
import { NoteRouter } from './NoteRouter'
import { LoginRouter } from './LoginRouter'

const app = express();
const auth = authClass();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(auth.initialize());
app.use(cors());

//routing
app.use('/api/users', new NoteRouter().router());
app.use("/api/login/facebook", new LoginRouter().router());

app.listen(8080);
