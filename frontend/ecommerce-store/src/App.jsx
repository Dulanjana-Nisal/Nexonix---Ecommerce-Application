import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AccountPage from './pages/Account/AccountPage'
import OrdersPage from './pages/Orders/OrdersPage'
import CategoryPage from './pages/Category/CategoryPage'
import CartPage from './pages/Cart/CartPage'
import SearchPage from './pages/Search/SearchPage'
import DetailsPage from './pages/Details/DetailsPage'
import AdminPage from './Admin/AdminPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/products/:category' element={<CategoryPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/details/:productId' element={<DetailsPage />} />
      <Route path='/admin/:path' element={<AdminPage />} />
    </Routes>
  )
}

export default App
