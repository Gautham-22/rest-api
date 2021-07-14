if(process.env.NODE_ENV != "production") {   // NODE_ENV will be populuated as production when deployed to Heroku 
    require("dotenv").config();              // configuring or using local env variables during development   
}
const express = require("express");
const mongoose = require("mongoose");
const router = require("./server/routes/router");

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE_URL,{    // DATABASE_URL will be populated to MongoDB Atlas cluster by heroku
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Database connection successful");
})
.catch((err) => {
    console.log(err);
    process.exit(1);
})

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