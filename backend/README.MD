### RECOMMEND FILE STRUCTURE
/src
  /config
    db.js

  /models        ← ✅ BEST place for MongoDB schemas
    user.model.js
    product.model.js
    order.model.js
    cart.model.js

  /controllers
    user.controller.js
    product.controller.js
    order.controller.js

  /routes
    user.routes.js
    product.routes.js
    order.routes.js

  /services
    user.service.js
    order.service.js

  /middlewares
    auth.middleware.js

  /utils
    helpers.js

  app.js
  server.js



## add cart item process
1. check user exist
2. if not add item with user id
3. if thats true only add items for that user

db.cart.updateOne(
  { userId: ObjectId("user_id_here") },
  {
    $push: {
      items: {
        productId: ObjectId("prod_id_2"),
        name: "Mouse",
        price: 50,
        quantity: 2
      }
    },
    $inc: { totalPrice: 100 }, // 50 * 2
    $set: { updatedAt: new Date() }
  }
)