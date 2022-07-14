require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job')

//middelware
app.use(express.json())

//routers
app.use('/api/auth',authRouter )
app.use('/api/jobs',jobRouter )

//error handler 
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, console.log(`listening to port${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();


