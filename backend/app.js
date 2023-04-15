import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import sql from './config/sql.js';
import * as User from './app/controllers/userController.js';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/sign-up', (req, res) => User.createUser(req, res));
app.post('/log-in', (req, res) => User.logIn(req, res));
app.get('/user', (req, res) => User.getUserInfo(req, res));
app.put('/user', (req, res) => User.updateUserInfo(req, res));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;