if(process.env.NODE_ENV !== "production") {   // value of NODE_ENV will be production when deployed to Heroku
    require("dotenv").config();               // implies that we are using .env of local repo when not in production 
}

const express = require("express");
const mongoose = require("mongoose");
const router = require("./server/routes/router");

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });  // DATABASE_URL will be set with mongoDB cluster in heroku
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/members",router);

app.get("/",(req,res) => {
    res.send("<h1>REST API</h1>");            // can replaced with home page while creating frontend 
})

const PORT = process.env.PORT || 5000;        //  PORT will be populuated when deployed to Heroku    
app.listen(PORT,() => {
    console.log(`Server started listening on ${PORT}`);
})