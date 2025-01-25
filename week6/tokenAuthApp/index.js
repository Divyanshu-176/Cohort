const express= require("express");
const app=express();

app.use(express.json()); //express.json as a middleware to parse the post request body

const users=[] //stores username, password & token


function generateToken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}


app.post("/signup", (req,res)=>{
    const username=req.body.username;
    const password= req.body.password;

    users.push({
        username: username,
        password: password
    })


    res.json({
        msg:"Signed Up"
    })

    console.log(users);
});



app.post("/signin", (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    let foundUser=null;

    for (let i=0; i<users.length; i++){
        if (users[i].username==username && users[i].password==password){
            foundUser=users[i];
        }
    }


    if(foundUser){
        const token=generateToken();

        foundUser.token= token;
        res.json({
            msg:"Token is generated"
        })
    }else{
        res.json({
            msg:'Invalid username or password'
        })
    }

    
    console.log(users);

});



app.get("/me", (req,res)=>{
    const token= req.headers.token;

    let foundUser=null;
    for (let i=0; i<users.length; i++){
        if (users[i].token===token){
            foundUser=users[i];
        }
    }

    if(foundUser){
        res.json({
            msg:"welcome"+' '+ foundUser.username
        })
    }else{
        res.status(401).send({
            msg:"unauthorised token"
        })
    }
})

app.listen(3001);
