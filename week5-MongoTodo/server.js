const express = require("express");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt");
const {z}=require("zod");
const mongoose=require("mongoose");
const {userModel, todoModel}= require("./db")
const {auth}=require("./auth")
const cors=require("cors")

const JWT_SECRET="S3CRET";


mongoose.connect("mongodb+srv://divyanshujain176:qEDyhVQWpRaGmBOz@cluster0.cooc1jw.mongodb.net/week5-Todo");


const app = express();
app.use(express.json());
app.use(cors());




app.post("/signup", async function(req,res){
    const email= req.body.email;
    const name= req.body.name;
    const password= req.body.password;

    const hashedPassword= await bcrypt.hash(password,10);

    const userDetails = await userModel.create({
        email:email,
        password:hashedPassword,
        name:name
    })``

    res.json({
        msg:"You are logged in"
    })
    // console.log("Logged in");
    // console.log(userDetails);
});


app.post("/signin", async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user= await userModel.findOne({
        email:email,
    });

    if(!user){
        res.status(403).json({
            msg:"User not found"
        })
    }
    
    const passwordMatch=await bcrypt.compare(password, user.password);

    
    if(passwordMatch){
        const token = jwt.sign({
            id:user._id.toString()
        }, JWT_SECRET)

        res.json({
            token:token
        });

        
    }else{
        res.status(403).json({
            msg:"Wrong credentials"
        })
    }



});


app.post("/create", auth, async function(req,res){
    const task=req.body.task;
    const status=req.body.status ?? false;
    const userId= req.userId;

    const todo=await todoModel.create({
        task:task,
        status:status,
        userId:userId
    });
    res.json({
        msg:"Todo created"
    })

    console.log(`Todo created: ${todo} in ${userId}`);

});

app.delete("/delete",auth, async function(req,res){
    const todoId= req.body.todoId;
    const userId=req.userId;

    const deletedTodo = await todoModel.findOneAndDelete({
        _id:todoId,
        userId:userId
    });

    if(!deletedTodo){
        return res.status(404).json({
            msg:"Todo not found"
        });
    }
        res.json({ msg: "Todo deleted successfully" });
});

app.put("/update",auth, async function(req,res){
    const todoId=req.body.todoId;
    const userId=req.userId;

    const todo=await todoModel.findOneAndUpdate(
        {_id:todoId, userId:userId},
        {"$set": {task:req.body.task, status:req.body.status}}
    );

    if (!todo) {
        return res.status(404).json({ msg: "Todo not found or not authorized" });
    }

    res.json({ msg: "Todo updated successfully" });
});

app.get("/todos", auth, async function(req,res){
    const userId=req.userId;

    const todos= await todoModel.find({
        userId:userId
    });

    res.json({
        todos
    });
});



app.listen(3001);