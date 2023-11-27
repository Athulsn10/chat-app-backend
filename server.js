const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const multer = require('multer')


const app = express();
app.use(express.json());
dotenv.config();
connectDB()
app.get('/',(req,res)=>{
    res.send('API is running succesfully')
});

// img upload
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       return cb(null, "./images")
//     },
//     filename: function (req, file, cb) {
//       return cb(null, `${Date.now()}_${file.originalname}`)
//     }
//   })
  
//   const upload = multer({storage})
//   app.post('/upload', upload.single('file'), (req, res) => {
//     // console.log(req.body)
//     console.log(req.file)
//   })


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

const PORT = process.env.PORT || 5000
app.listen(5000,console.log(`Server Started on port ${PORT} `))
