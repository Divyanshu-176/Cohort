    const express= require("express");
    const app=express();
    const jwt=require("jsonwebtoken");


    const JWT_SECRET="randomanything";


    app.use(express.json()); //express.json as a middleware to parse the post request body

    const users=[] //stores username, password & token


 

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
            const token=jwt.sign({ //Token is encoded with username
                username:username //what do you want to encode (our case username),
            },JWT_SECRET//What is your secret to encode
            );

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
        const token= req.headers.token; //This is JWT
        const decodedInfo=jwt.verify(token,JWT_SECRET); //converting JWT to username (we are decoding it)

        const username= decodedInfo.username;

        let foundUser=null;
        for (let i=0; i<users.length; i++){
            if (users[i].username===username){
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

    app.listen(3000);
