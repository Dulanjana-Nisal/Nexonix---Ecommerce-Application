import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AccountPage from './pages/Account/AccountPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/account' element={<AccountPage />} />
    </Routes>
  )
}

export default App
