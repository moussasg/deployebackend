const {requireAuth} = require('./src/controllers/authController')
const express = require('express')
const dotenv = require('dotenv');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const authController = require('./src/controllers/authController')
const cookieParser = require('cookie-parser');
const {checkUser } = require('./src/controllers/authController')
app.use(cors())
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.post('/signup', authController.signup_post);
app.post('/login', authController.login_post);
app.post('/MesSmartphones/:id', authController.commands_post)
app.get('/users', authController.users_get); // get all users
app.get('/user', authController.user_get); // get spécifique user
app.get('/', (req, res) => {
  return res.send('Yo!')
})
/*
app.get('/logout', authController.requireAuth, (req, res) => {
  res.render('logout');
});
*/
// Route '/logout' - GET route for user logout
/*
app.get('/logout', authController , (req,res)=> {
  res.render('logout');
});
*/
// Middleware
const PORT = process.env.PORT
app.get('*', checkUser);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

mongoose.set('strictQuery', false);
const connectdb = async ()=> {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`mongodb conected : ${conn.connection.host}`)
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
}
connectdb().then(()=> {
 app.listen(PORT , ()=> {
  console.log(`listening at port ${PORT}`)
})
})



