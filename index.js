const {requireAuth} = require('./src/controllers/authController')
const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser'); /// trés essentielles trés trés
const mongoose = require('mongoose');
const authController = require('./src/controllers/authController')
const {checkUser } = require('./src/controllers/authController')
dotenv.config();
app.use(cors({
  origin: 'https://soft-cannoli-96b536.netlify.app',
  methods: 'GET, POST',
  credentials: true, // Allow credentials
}));// Set up CORS headers manually
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://mylastecommercewebsite.netlify.app');
res.header('Access-Control-Allow-Methods', 'GET, POST');
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.get('*', checkUser);
app.post('/signup', authController.signup_post);
app.post('/login', authController.login_post);
app.post('/MesSmartphones/:id', authController.commands_post)
app.get('/users', authController.users_get); // get all users
app.get('/user', authController.user_get); // get spécifique user
app.get('/', (req, res) => {
  return res.send('Yo!')
})
const PORT = process.env.PORT
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL , { useNewUrlParser: true  , useUnifiedTopology:true,} , ()=> {
  console.log("mongodb is connected")
});
 app.listen(PORT , ()=> { 
  console.log(`listening at port ${PORT}`)
})



