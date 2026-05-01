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