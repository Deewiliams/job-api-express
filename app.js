require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// const mainRouter = require('./routes/main')

//middelware
app.use(express.json())

app.get('/', function (req, res) {
    res.send('<h1>store api </h1>')
})

// app.use('/api',mainRouter )

//error handling
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


