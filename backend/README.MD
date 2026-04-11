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



  