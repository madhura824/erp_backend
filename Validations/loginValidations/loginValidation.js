

const loginValidation=(req,res,next)=>{
    // console.log("logiin val working")
    // next()

    const {userID, password}=req.body;
    if(userID==null ){
        res.status(400).json({
            error:'User cannot be empty'
        }) 
    }
    else if(password==null ){
        res.status(400).json({
            error:'Password cannot be empty'
        }) 
    }
    else if(userID.length<5 || userID.length>50){
        res.status(400).json({
            error:'Enter Valid UserId'
        })
    }
    else if(password.length<8){
        res.status(400).json({
            error:'Enter Valid Password. Password Length is too short.'
        })
    }else{
        next();
    }

}

module.exports=loginValidation;