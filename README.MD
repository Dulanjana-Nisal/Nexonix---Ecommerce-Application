### Frontend React File Structure Example

src/
│
├── app/                  # App-level setup (store, routes, providers)
│   ├── store.js
│   ├── routes.jsx
│   └── providers.jsx
│
├── features/             # 🔥 Core business logic (by domain)
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── authSlice.js
│   │   └── api.js
│   │
│   ├── products/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── productSlice.js
│   │   └── api.js
│   │
│   ├── cart/
│   │   ├── components/
│   │   ├── cartSlice.js
│   │   └── utils.js
│   │
│   ├── orders/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── orderSlice.js
│   │   └── api.js
│
├── components/           # 🧩 Shared reusable UI (buttons, inputs, modals)
│   ├── Button.jsx
│   ├── Modal.jsx
│   └── Loader.jsx
│
├── layouts/              # Layout wrappers
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
│
├── pages/                # Route-level pages (optional if using feature pages)
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   └── Checkout.jsx
│
├── services/             # API clients (axios, fetch setup)
│   └── apiClient.js
│
├── hooks/                # Custom hooks
│   ├── useAuth.js
│   └── useCart.js
│
├── utils/                # Helpers
│   ├── formatPrice.js
│   └── constants.js
│
├── styles/               # Global styles
│   └── globals.css
│
├── assets/               # Images, icons
│
└── main.jsx              # Entry point








Query {
  _mongooseOptions: {},
  _transforms: [],
  _hooks: Kareem { _pres: Map(0) {}, _posts: Map(0) {} },
  _execCount: 0,
  mongooseCollection: Collection {
    collection: Collection { db: [Db], s: [Object], client: [MongoClient] },
    Promise: [Function: Promise],
    modelName: 'carts',
    _closed: false,
    opts: {
      autoIndex: true,
      autoCreate: true,
      autoSearchIndex: false,
      schemaUserProvidedOptions: {},
      capped: false,
      Promise: undefined,
      '$wasForceClosed': undefined
    },
    name: 'carts',
    collectionName: 'carts',
    conn: NativeConnection {
      base: [Mongoose],
      collections: [Object],
      models: [Object],
      config: {},
      replica: false,
      options: null,
      otherDbs: [],
      relatedDbs: {},
      states: [Object: null prototype],
      _readyState: 1,
      _closeCalled: undefined,
      _hasOpened: true,
      plugins: [],
      id: 0,
      _queue: [],
      _listening: false,
      _lastHeartbeatAt: null,
      _connectionOptions: [Object],
      _connectionString: 'mongodb://dulanjananisal67_db_user:d123u45l@ac-shecint-shard-00-00.r9sh7gq.mongodb.net:27017,ac-shecint-shard-00-01.r9sh7gq.mongodb.net:27017,ac-shecint-shard-00-02.r9sh7gq.mongodb.net:27017/ecommerce-store?ssl=true&replicaSet=atlas-6prjl6-shard-0&authSource=admin',
      client: [MongoClient],
      '$initialConnection': [Promise],
      db: [Db],
      host: 'ac-shecint-shard-00-00.r9sh7gq.mongodb.net',
      port: 27017,
      name: 'ecommerce-store',
      Symbol(mongoose:defaultConnection): true
    },
    queue: [],
    buffer: false,
    emitter: EventEmitter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      Symbol(shapeMode): false,
      Symbol(kCapture): false
    }
  },
  model: Model { carts },
  schema: Schema {
    obj: { userId: [Object], items: [Array], totle_items: [Object] },
    paths: {
      userId: [SchemaObjectId],
      items: [SchemaDocumentArray],
      totle_items: [SchemaNumber],
      _id: [SchemaObjectId],
      __v: [SchemaNumber]
    },
    aliases: {},
    subpaths: {
      'items.productId': [SchemaObjectId],
      'items.name': [SchemaString],
      'items.quantity': [SchemaNumber],
      'items.availability': [SchemaBoolean],
      'items.stock': [SchemaNumber],
      'items.price': [SchemaNumber],
      'items.image': [SchemaString],
      'items._id': [SchemaObjectId],
      'items.createdAt': [SchemaDate],
      'items.updatedAt': [SchemaDate]
    },
    virtuals: { id: [VirtualType] },
    singleNestedPaths: {},
    nested: {},
    inherits: {},
    callQueue: [],
    _indexes: [],
    _searchIndexes: [],
    methods: { initializeTimestamps: [Function (anonymous)] },
    methodOptions: {},
    statics: {},
    tree: {
      userId: [Object],
      items: [Array],
      totle_items: [Object],
      _id: [Object],
      __v: [Function: Number],
      id: [VirtualType]
    },
    query: {},
    childSchemas: [ [Object] ],
    plugins: [ [Object], [Object], [Object], [Object] ],
    '$id': 5,
    mapPaths: [],
    encryptedFields: {},
    s: { hooks: [Kareem] },
    _userProvidedOptions: {},
    options: {
      strict: true,
      strictQuery: false,
      bufferCommands: true,
      capped: false,
      versionKey: '__v',
      optimisticConcurrency: false,
      minimize: true,
      autoIndex: null,
      discriminatorKey: '__t',
      shardKey: null,
      read: null,
      validateBeforeSave: true,
      validateModifiedOnly: false,
      _id: true,
      id: true,
      typeKey: 'type',
      pluralization: true
    },
    '$timestamps': { createdAt: null, updatedAt: null },
    '$globalPluginsApplied': true
  },
  op: 'findOne',
  options: {},
  _conditions: { userId: '6a01e83a915edc00e2425107' },
  _fields: undefined,
  _updateDoc: undefined,
  _path: undefined,
  _distinctDoc: undefined,
  _collection: NodeCollection {
    collection: Collection {
      collection: [Collection],
      Promise: [Function: Promise],
      modelName: 'carts',
      _closed: false,
      opts: [Object],
      name: 'carts',
      collectionName: 'carts',
      conn: [NativeConnection],
      queue: [],
      buffer: false,
      emitter: [EventEmitter]
    },
    collectionName: 'carts'
  },
  _traceFunction: undefined,
  '$useProjection': true
}