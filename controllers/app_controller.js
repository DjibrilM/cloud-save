const imageModel  = require('../models/image')
exports.get404 = (req,res,next)=>{
  res.render('application/404.ejs')
}
exports.getHome = (req,res,next)=>{
  imageModel.find()
  .then(images=>{
   console.log(images)
   res.render('application/index.ejs',
   {
     images:images,
     pageTitle:'Home',
     data:images
    });
  }).catch(err=>{
    console.log('error');
  })
}
