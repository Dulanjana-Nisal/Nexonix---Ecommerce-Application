import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AccountPage from './pages/Account/AccountPage'
import OrdersPage from './pages/Orders/OrdersPage'
import CategoryPage from './pages/Category/CategoryPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/products/:category' element={<CategoryPage />} />
    </Routes>
  )
}

export default App
