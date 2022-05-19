const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const reqFlash = require('connect-flash')
const multer = require('multer');
const bodyparse = require('body-parser')
const session = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session)

//change
const AppRouteres = require('./routes/app_route.js');
const adminRouters = require('./routes/admin')
const authRouters = require('./routes/auth')

//multer configiration
const destinationStore = multer.diskStorage({
    destination:(req,file,cb) =>{
      cb(null,'images')
    },
    filename:(req,file,cb)=>{  
     cb(null, new Date().toISOString() + '-' + file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null, true)
    }else{
      cb(null,false)
    }
  }
const MONGODB_STORE = 'mongodb://localhost:27017/CloudeSave'
const store = new MongoDBStore ({
  uri:MONGODB_STORE,
  collection:'sessions'
})
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images',express.static(path.join(__dirname, 'images')))
app.use(multer({storage:destinationStore,fileFilter:fileFilter}).single('image'))
app.use(session({
  store:store, 
  secret:'secrettoscretMysecret',
  saveUninitialized:false,
  resave:false,
}))
app.use(bodyparse.urlencoded({extended:false}))
app.use(reqFlash())
app.set('views engine', 'ejs');
app.set('views','views')

//put the user in all request 

// app.use((req,res,next)=>{
// const sessionId = req.session.user;
// // console.log(sessionId, 'frm user session');
// next();
// })


app.use((error,req,res,next)=>{
   console.log(error, 'error')
   const errorMessage = error.message || 'an error occured while saving the image';
   const statusCode = error.statusCode || 500;
   res.status(statusCode).json({message:errorMessage})
    next();
})

//use routes 
app.use(AppRouteres)
app.use(adminRouters)
app.use(authRouters);

mongoose.connect(MONGODB_STORE)
.then(Result=>{
    app.listen(3000)
})