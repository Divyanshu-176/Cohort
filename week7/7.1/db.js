const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectID=Schema.ObjectId;


const User= Schema({
    name:String,
    email:{type:String, unique:true},
    password:String
});

const Todo=Schema({
    Title:String,
    done:Boolean,
    userId:ObjectID
});


const UserModel=mongoose.model("users", User);
const TodoModel=mongoose.model("todos", Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}
