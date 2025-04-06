const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;


const User = new Schema({
    name:String,
    email:String,
    password:String
});


const Todo=new Schema({
    status:Boolean,
    task:String,
    userId:ObjectId
})

const userModel=mongoose.model('users', User);
const todoModel=mongoose.model('todos', Todo);


module.exports={
    userModel:userModel,
    todoModel:todoModel
}
