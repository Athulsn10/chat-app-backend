const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./Data/data');
const connectDB = require('./config/db')

const app = express()
console.log(chats);
dotenv.config();
connectDB()
app.get('/',(req,res)=>{
    res.send('API is running succesfully')
});

app.get('/api/chat',(req,res)=>{
    res.send(chats)
    
});

app.get('/api/chat/:id',(req,res)=>{
    // console.log(req.params.id);
    const singleChat = chats.find((c)=>c._id === req.params.id);
    res.send(singleChat);
})

app.get('/aoi/chat/:id',(req,res)=>{
    console.log("id= "+ req.params.id);
})

const PORT = process.env.PORT || 5000
app.listen(5000,console.log(`Server Started on port ${PORT} `))
