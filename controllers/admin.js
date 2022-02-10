const imagesModel = require('../models/image');
const userModel =  require('../models/users')
const notesModel = require('../models/image')
const {validationResult} = require('express-validator')

  exports.addNote = (req,res,next)=>{
 const title = req.body.title;
 const image = req.file;

 imagesModel.findOne({title:title})
 .then(result=>{
 if(result){
   console.log(result)
   const error = new Error('image already exist')
   throw error;
 }

 const imageMdl = new imagesModel(
   {
     title:title,
     imagepath:image.path,
     IdentTitle:title.toUpperCase(),
     creator:req.session.user._id
    })
  return imageMdl.save()
 }).then(result=>{
    res.status(201).json({message:'image saved',data:result})
 }).catch(err=>{
   if(!err.statusCode){
    err.statusCode = 500;
   }
   next(err)
 })
  }

  exports.getProfile = async (req,res,next)=>{
    const mondodb = require('mongodb')
    const userId = req.params.userId;
    userModel.findOne({_id:userId})
    .then(user=>{
      if(!user){
      return res.redirect('/404')
      }
      //render the profile  page  
      res.render('admin/profile.ejs',{
        userData:user
      })
    }).catch(err=>{
      console.log(err)
      res.redirect('/404')
    })
  }


  
