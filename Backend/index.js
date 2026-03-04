const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./DB/Db');
const router = require('./Routes/user')

const cors=require ('cors')

app.use(cors())

app.use(express.json())
app.use("/files", express.static("uploads"));



app.use('/',router)

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


