import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AccountPage from './pages/Account/AccountPage'
import OrdersPage from './pages/Orders/OrdersPage'
import CategoryPage from './pages/Category/CategoryPage'
import CartPage from './pages/Cart/CartPage'
import SearchPage from './pages/Search/SearchPage'
import DetailsPage from './pages/Details/DetailsPage'
import AdminPage from './Admin/AdminPage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import { Cart } from './context/CartContext'
import NotFoundPage from './pages/404/NotFoundPage'
import NotificationsPage from './pages/Notifications/NotificationsPage'

function App() {

  //load context
  const { user } = Cart()

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/products/:category' element={<CategoryPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/details/:productId' element={<DetailsPage />} />
      {
        user?.role === 'admin' ?
          <Route path='/admin/:path' element={<AdminPage />} />
          :
          <Route path='*' element={<NotFoundPage />} />
      }
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
