exports.isAuth = (req,res,next)=>{
    if(req.session.isAth !== true){
     return res.redirect('/loggin')
    }else{
        next();
    }
}


exports.isAuth__ = (req,res,next)=>{
    if(req.session.isAth == true){
     return res.redirect('/404')
    }else{
        next();
    }
}
