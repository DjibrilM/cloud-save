const imageModel  = require('../models/image')
exports.get404 = (req,res,next)=>{
  res.render('application/404.ejs')
}
exports.getHome = (req,res,next)=>{
  let profile;

if(req.session.user.status.length > 5){
  console.log(req.session.user.status)
  profile = req.session.user.status;
}

  
  imageModel.find({creator:req.session.user._id})
  .then(images=>{
   res.render('application/index.ejs',
   {
     images:images,
     pageTitle:'Home',
     data:images,
     profile:profile,
     __id:req.session.user._id

    });
  }).catch(err=>{
    console.log('error');
  })
}
