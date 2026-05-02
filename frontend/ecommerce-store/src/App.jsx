import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AccountPage from './pages/Account/AccountPage'
import OrdersPage from './pages/Orders/OrdersPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/orders' element={<OrdersPage />} />
    </Routes>
  )
}

export default App
