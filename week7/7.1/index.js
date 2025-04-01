const express=require("express");
const {UserModel, TodoModel} = require("./db");
const jwt=require("jsonwebtoken");
const JWT_SECRET='abcd';

const mongoose=require("mongoose")
mongoose.connect("")

const app=express();
app.use(express.json());


app.post("/signup",async function(req,res){
    const email =req.body.email;
    const name =req.body.name;
    const password =req.body.password;

    await UserModel.create({
        email:email,
        name:name,
        password:password
    })

    res.json({
        msg:"You are signed up"
    })

});



app.post("/signin", async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user = await UserModel.findOne({
        email:email,
        password:password
    })

    console.log(user);

    if(user){
        const token=jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token:token
        });

    }else{
        res.status(403).json({
            msg:"Wrong credentials"
        });
    }
});



app.post("/create", auth, function(req,res){
    const userId=req.userId;
    res.json({
        user:userId
    })


});



app.get("/todos",auth, function(req,res){
    const userId=req.userId;
    res.json({
        user:userId
    })
});




function auth(req,res,next){
    const token=req.headers.token;

    const decodedData= jwt.verify(token, JWT_SECRET);

    if(decodedData){
        req.userId=decodedData.userId;
        next();

    }else{
        res.status(403).json({
            msg:"Wrong credentials man!"
        })
    }
}

app.listen(3000)
