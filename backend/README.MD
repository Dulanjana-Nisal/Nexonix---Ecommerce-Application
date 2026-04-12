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


https://www.aliexpress.com/w/wholesale-gaming-mouses.html?g=y&SearchText=gaming+mouses&streamId=e487c208-859b-4f1e-a77c-2d4a8d64a03e&pr=344-1000

  Products.find({
    price: {
      $gt: max_number,
      $lt: min_number
    },
    ratings: {
      $gt: max_number,
      $lt: min_number
    },
  })