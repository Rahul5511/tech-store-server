const express = require('express');
const {dbConnection} = require('./config/db');
const app = express();
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

//db connection
dbConnection();

//middlewares
app.use(express.json())

app.get('/',(req,res) => {
    res.send('message coming')
})

//api routes
app.use('/api',userRoute)

app.use(errorHandler)

const port =process.env.PORT_NUMBER || 3040;
app.listen(port,() => {
    console.log(`server is running on ${port}`)
})