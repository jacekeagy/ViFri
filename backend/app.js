import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import sql from './config/sql.js';
import * as Auth from './app/controllers/authController.js'
import * as User from './app/controllers/usersController.js';
import * as Item from './app/controllers/itemsController.js';
import { getRecipesList } from './app/services/recipeGenerator.js';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json());

var corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
app.use(express.json());

//auth
app.post('/signup', (req, res) => Auth.createUser(req, res));
app.post('/login', (req, res) => Auth.logIn(req, res));
app.post('/logout', (req, res) => Auth.logOut(req,res));

//user
app.get('/users', (req, res) => User.getUserInfo(req, res));
app.put('/users', (req, res) => User.updateUserInfo(req, res));
app.get('/users/items', (req, res) => User.getItemList(req, res));
app.get('/users/reminder', (req, res) => User.getReminderList(req, res));

//item
app.post('/items', (req, res) => Item.addItem(req, res));
app.get('/items', (req, res) => Item.getItemInfo(req, res))
app.put('/items', (req, res) => Item.updateItemInfo(req, res))
app.delete('/items', (req, res) => Item.deleteItem(req, res))

app.get('/recipes', (req, res) => getRecipesList(req, res));
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;