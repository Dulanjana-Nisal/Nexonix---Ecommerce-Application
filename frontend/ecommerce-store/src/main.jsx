import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
import MessageProvider from './context/MessagesContext.jsx'
import NotifiContext from './Admin/Context/NotificationContext.jsx'
import NotifiUserContext from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NotifiContext>
      <NotifiUserContext>
        <CartProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </CartProvider>
      </NotifiUserContext>
    </NotifiContext>
  </BrowserRouter>,
)
