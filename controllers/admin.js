const imagesModel = require('../models/image');

const notesModel = require('../models/image')
const {validationResult} = require('express-validator')

exports.getAddNote = (req,res,next)=>{
  res.render('admin/addNote.ejs',{
    pageTitle:'Home'
  })
  }

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
     IdentTitle:title.toUpperCase()
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
  
