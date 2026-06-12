require('dotenv').config();
const dbConnection = require('./db/server');
const errorHaddlerMiddleware = require('./middlewares/errorHaddlerMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddlewaare')

const cors = require('cors');
const users = require('./routers/accountsRouters');
const products = require('./routers/productsRouters');
const orders = require('./routers/ordersRouters');
const cart = require('./routers/cartRouters');
const review = require('./routers/rewiewRouter')
const notifications = require('./routers/notificationRouters');

const express = require('express');
const app = express(); 

//middleware
app.use(express.json());
app.use(cors())

//routers
app.use('/api/v1/account', users);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/cart', cart);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/reviews', review);

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
