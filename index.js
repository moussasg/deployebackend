const {requireAuth} = require('./src/controllers/authController')
const express = require('express')
const dotenv = require('dotenv');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const authController = require('./src/controllers/authController')
const {checkUser } = require('./src/controllers/authController')
dotenv.config();
app.use(cors({
  origin: 'https://soft-cannoli-96b536.netlify.app', // Replace with your frontend domain or specific domains
  methods: 'GET, POST, PUT',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json());
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
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL , { useNewUrlParser: true  , useUnifiedTopology:true,} , ()=> {
  console.log("mongodb is connected")
});
 app.listen(PORT , ()=> { 
  console.log(`listening at port ${PORT}`)
})



