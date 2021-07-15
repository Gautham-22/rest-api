if(process.env.NODE_ENV !== "production") {   // value of NODE_ENV will be production when deployed to Heroku
    require("dotenv").config();               // implies that we are using .env of local repo when not in production 
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Database connection
let router;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(() => {           // makes sure that models are loaded and used after connection
    console.log("Connected to mongodb"); 
    router = require("./server/routes/router");
    app.use("/api/members",router);
})
.catch((err) => {
    console.log(err.message);
    process.exit(1);
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res) => {
    res.send("<h1>REST API</h1>");            // can replaced with home page while creating frontend 
})

const PORT = process.env.PORT || 5000;        //  PORT will be populuated when deployed to Heroku    
app.listen(PORT,() => {
    console.log(`Server started listening on ${PORT}`);
})