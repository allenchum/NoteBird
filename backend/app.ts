import * as express from 'express';
import * as bodyParser from 'body-parser';
import authClass from './auth';
import * as cors from 'cors';
import * as path from 'path';
//import { NoteRouter } from './router/NoteRouter'
import { LoginRouter } from './router/LoginRouter'
import { NoteAndPinRouter } from './router/NoteAndPinRouter'
import { GetUserRouter } from  './router/GetUser'
import { Upload } from './router/Upload'
import { Bookmark } from './router/Bookmark'

const app = express();
const auth = authClass();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(auth.initialize());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, 'upload')));

//routing
app.use("/api/login/facebook", new LoginRouter().router());
app.use('/api/noteAndPin', auth.authenticate(), new NoteAndPinRouter().router());
app.use('/api/getUserInfo', auth.authenticate(), new GetUserRouter().router());
app.use('/multer', auth.authenticate(), new Upload().router());
app.use('/api/bookmark', auth.authenticate(), new Bookmark().router());

app.listen(8080);
