const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./Data/data');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());
dotenv.config();
connectDB()
app.get('/',(req,res)=>{
    res.send('API is running succesfully')
});

app.use('/api/user',userRoutes)

const PORT = process.env.PORT || 5000
app.listen(5000,console.log(`Server Started on port ${PORT} `))
