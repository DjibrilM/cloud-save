const imagesModel = require('../models/image');
const userModel =  require('../models/users')
const bcycript = require('bcryptjs')
const fs = require('fs')
// const notesModel = require('../models/image')
const {validationResult} = require('express-validator')

  exports.addNote = (req,res,next)=>{
 const title = req.body.title;
 const image = req.file;

console.log(image)

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

  //delete image end point controller 


exports.deleteImage =async (req,res,next)=>{
 const imageId = req.body.id
 imagesModel.findById({_id:imageId})
 .then(result=>{
  const mongo = require('mongodb')
  console.log(mongo.ObjectId(result.creator), 'file goten')
  if(mongo.ObjectId(result.creator).toString() !== req.session.user._id.toString()){
    return  res.status(402).json({message:'no authorise',statusCode:402})
  }
 return result.deleteOne({_id:imageId})
 })
 .then(deleteFile=>{
 return fs.unlink(deleteFile.imagepath, err=>{
 })
 }).then(end=>{
   res.status(202).json({message:'file deleted', statusCode:202})
 }).catch(err=>{
   console.log(err);
   res.status(404).json({messgae:'faild to delete the file',status:500})
 })
}

//get user profile
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
      userData:user,
      passwordError:false
    })
  }).catch(err=>{
    console.log(err)
    res.redirect('/404')
  })
}


exports.editProfile  = async (req,res,next)=>{
  const password = req.body.password;
  const id = req.body.id
  const user = await userModel.findById(id);
  const comparePassword = await bcycript.compare(password,user.password);
  if(!comparePassword){
     return res.render('admin/profile.ejs',{
      userData:user,
      passwordError:true
     })
     }  
     req.flash('__id',user._id);
     res.redirect('/prfile_editing');
}

exports.profileEditing = async (req,res,next)=>{
// console.log(req.flash('__id')[0].toString() === req.session.user._id.toString())
let userId = req.flash('__id')[0] || '1,2,3';
console.log(userId);
if(userId.length < 4){
  return res.redirect ('404')
}
if(userId.toString() !== req.session.user._id.toString()){
  return res.redirect('404')
}
res.render('admin/edit-profile.ejs',{
  userData:req.session.user,
  passwordError:false
})
}

exports.profileReset = (req,res,next)=>{
  const firstName = req.body.firstsName;
  const secondName = req.body.secondName;
  const email = req.body.email;
  const password = req.body.password;
  const userId = req.body._id;
  const image = req.file;

  console.log(image,'reched the middleware')
  res.status(202).json({message:'no error found'})
}


  
  

