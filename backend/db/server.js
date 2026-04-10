const mongoose = require('mongoose');

const dbConnection = (url)=>{
    mongoose.connect(url)
            .then(()=>{console.log('Database Connected!')})
            .catch((err)=>{console.log(err)})
}

module.exports = dbConnection;