import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'

// calling user build packages
import connectToMongoDB from './utils/conn.js';        //connecting the database
import userRoute from './routes/auth.route.js';     // calling auth-route
import questionRoute from './routes/question.route.js';     // calling question-route
import adminRoute from './routes/admin.route.js'            // calling the admin route

const app = express();
dotenv.config();

// setting up cors 
app.use(cors({
    origin: "http://localhost:5173", credentials: true
}));


const PORT = process.env.PORT || 3000;

app.use(express.json());// to parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// calling Routes
app.use('/api/v1/auth', userRoute)      //user API
app.use('/api/v1/admin', adminRoute)        // admin API
app.use('/api/v1/question', questionRoute)      //user API

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`)
})
