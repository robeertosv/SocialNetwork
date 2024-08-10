import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='*' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App