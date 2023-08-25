const {requireAuth} = require('./src/controllers/authController')
const express = require('express')
const dotenv = require('dotenv');
const app = express()
const mongoose = require('mongoose');
const authController = require('./src/controllers/authController')
const {checkUser } = require('./src/controllers/authController')
dotenv.config();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
app.use(express.json());
app.post('/signup', authController.signup_post);
app.post('/login', authController.login_post);
app.post('/MesSmartphones/:id', authController.commands_post)
app.get('/users', authController.users_get); // get all users
app.get('/user', authController.user_get); // get spécifique user
app.get('/', (req, res) => {
  return res.send('Yo!')
})
const PORT = process.env.PORT
app.get('*', checkUser);
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL , { useNewUrlParser: true  , useUnifiedTopology:true,} , ()=> {
  console.log("mongodb is connected")
});
 app.listen(PORT , ()=> { 
  console.log(`listening at port ${PORT}`)
})



