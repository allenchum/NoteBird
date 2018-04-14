import * as express from 'express';
import * as bodyParser from 'body-parser';
import authClass from './auth';
import * as cors from 'cors';
//import { NoteRouter } from './router/NoteRouter'
import { LoginRouter } from './router/LoginRouter'
import { NoteAndPinRouter } from './router/noteAndPinRouter'
import { GetUserRouter } from  './router/getUser'

const app = express();
const auth = authClass();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(auth.initialize());
app.use(cors());

//routing
app.use("/api/login/facebook", new LoginRouter().router());
app.use('/api/noteAndPin', auth.authenticate(), new NoteAndPinRouter().router());
app.use('/api/getUserInfo', auth.authenticate(), new GetUserRouter().router());


app.listen(8080);
