const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
// const multer = require('multer')
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB()
app.get('/',(req,res)=>{
    res.send('API is running succesfully')
});
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

const PORT = 5000 || process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`)
})
const io = require('socket.io')(server,{
    pingTimeout:100000,
    cors:{
        origin:'https://chatify-brown.vercel.app'
        // origin:'http://localhost:3000'
    }
})
io.on("connection",(socket)=>{
    console.log('Socket.io connected');
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        socket.emit('connected');
        console.log(userData._id);
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User joind room" + room);
    })
    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users){
            console.log('user undefined');
            return
        }else{
            chat.users.forEach((user)=>{
                if(user._id == newMessageRecieved.sender._id) return;
                socket.in(user._id).emit('message recieved',newMessageRecieved)
            })
        }
    })

})

// deployment
