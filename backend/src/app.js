require('dotenv').config();
const users = require('../routers/usersRouters')

const express = require('express');
const app = express();

//routers
app.use('/api/v1/user', users)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})