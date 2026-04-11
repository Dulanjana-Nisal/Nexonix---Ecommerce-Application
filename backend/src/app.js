require('dotenv').config();
const dbConnection = require('./db/server');
const errorHaddlerMiddleware = require('./middlewares/errorHaddlerMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddlewaare')
const users = require('./routers/usersRouters')

const express = require('express');
const app = express(); 

//middleware
app.use(express.json());

//routers
app.use('/api/v1/user', users)

//error haddlers
app.use(errorHaddlerMiddleware)
app.use(notFoundMiddleware)

//database connection
const PORT = process.env.PORT || 5000
const connection = async ()=>{
    try{
        await dbConnection(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}
connection();
