require('dotenv').config();

const express = require('express');
const app = express();

//routers
app.use('/api/v1/user', )

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})