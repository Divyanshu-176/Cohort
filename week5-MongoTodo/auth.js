const jwt = require("jsonwebtoken");
const JWT_SECRET="S3CRET";

function auth(req,res,next){
    const token=req.headers.token;

    const user=jwt.verify(token,JWT_SECRET);
    if(user){
        req.userId=user.id;
        next();
    }else{
        res.status(403).json({
            msg:"User does not exist"
        })
    }
}


module.exports={
    auth
}
