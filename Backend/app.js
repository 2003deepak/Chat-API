require("dotenv").config(); 
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const db = require('./config/mongoose-connection');

const app = express();  
const server = http.createServer(app);


// Setting Up Middleware for CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// Routes Import 
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');


// Setting Up Middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));



// Routes Setup
app.use("/", indexRouter);
app.use("/api", userRouter);




const PORT = process.env.PORT || 3000;

server.listen(PORT , (err, res) => {
    console.log("Server listening on 3000");
});







