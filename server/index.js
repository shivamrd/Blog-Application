import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import blogRoutes from './routes/blog.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()


// ✅ Allow big payload (Base64 image = large)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


//mongodb connection
mongoose.connect("mongodb://localhost:27017/shivam")
.then(()=>{console.log('MongoDB conneccton successful')})
.catch((err)=> console.log(err));

//niddleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000'
,
     credentials: true
}))

//routes
app.use('/user',userRoutes)
app.use('/blog',blogRoutes)

app.listen(8000, () =>console.log("server is running on port 8000"))
