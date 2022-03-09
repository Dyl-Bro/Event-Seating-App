const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');
const api = process.env.API_URL;
const authJwt = require('./HELPERS/jwt');
const errorHandler = require('./HELPERS/error-handler');

//ROUTE DEFINITION
const userRouter = require('./ROUTES/userRoute');
const tableRouter = require('./ROUTES/tableRoute');
const seatArrangementRouter = require('./ROUTES/seatArrangementRoute');

//MIDDLEWEAR
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);

//ROUTES
app.use(`${api}/userRoute`, userRouter);
app.use(`${api}/tableRoute`, tableRouter);
app.use(`${api}/seatArrangementRoute`, seatArrangementRouter);



// app.listen(4000, function() {
//     console.log(api);
//     console.log("EVENT SEATING APP SERVER IS LISTENING FOR REQUESTS ON PORT 4000");
// });
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.CONNECTION_STRING)//call mongoose.connect and pass connection string as parameter
    .then(()=> {
    console.log('EVENT SEATING DATABASE CONNECTION IS READY')
})
.catch((err)=>{
    console.log(err);
})
}


module.exports = app;