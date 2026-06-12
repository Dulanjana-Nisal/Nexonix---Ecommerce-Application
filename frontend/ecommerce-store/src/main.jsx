import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  CartProvider from './context/CartContext.jsx'
import MessageProvider from './context/MessagesContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </CartProvider>
  </BrowserRouter>,
)
