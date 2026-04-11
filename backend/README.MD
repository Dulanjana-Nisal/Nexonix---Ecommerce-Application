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



  ValidationError: users validation failed: email: Path `email` is required., password: Path `password` is required.
    at model.validate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\document.js:2864:36)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async model.$__save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:393:7)
    at async model.save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:667:5)
    at async model.create (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:2754:5)
    at async C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\src\controllers\usersController.js:7:20 {   
  errors: {
    email: ValidatorError: Path `email` is required.
        at SchemaString.doValidate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\schemaType.js:1465:13)
        at model.validate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\document.js:2842:20)
        at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
        at async model.$__save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:393:7)
        at async model.save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:667:5)
        at async model.create (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:2754:5)
        at async C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\src\controllers\usersController.js:7:20 {
      properties: [Object],
      kind: 'required',
      path: 'email',
      value: '',
      reason: undefined,
      Symbol(mongoose#validatorError): true
    },
    password: ValidatorError: Path `password` is required.
        at SchemaString.doValidate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\schemaType.js:1465:13)
        at model.validate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\document.js:2842:20)
        at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
        at async model.$__save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:393:7)
        at async model.save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:667:5)
        at async model.create (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:2754:5)
        at async C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\src\controllers\usersController.js:7:20 {
      properties: [Object],
      kind: 'required',
      path: 'password',
      value: '',
      reason: undefined,
      Symbol(mongoose#validatorError): true
    }
  },
  _message: 'users validation failed'
}


{
  password: ValidatorError: Password must be more than 6 characters
      at SchemaString.doValidate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\schemaType.js:1465:13)
      at model.validate (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\document.js:2842:20)
      at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
      at async model.$__save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:393:7)
      at async model.save (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:667:5)
      at async model.create (C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\node_modules\mongoose\lib\model.js:2754:5)
      at async C:\Users\dulan\Documents\Fullstack Development\e-commerce web app\backend\src\controllers\usersController.js:7:20 { 
    properties: {
      validator: [Function (anonymous)],
      message: 'Password must be more than 6 characters',
      type: 'minlength',
      minlength: 6,
      path: 'password',
      fullPath: undefined,
      value: 'd123',
      length: 4
    },
    kind: 'minlength',
    path: 'password',
    value: 'd123',
    reason: undefined,
    Symbol(mongoose#validatorError): true
  }
}