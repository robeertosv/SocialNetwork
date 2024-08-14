import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Notifications from './pages/Notifications'
import Posts from './pages/Posts'

const App = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/posts/*' element={<Posts />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='*' element={<Profile/>}/>
                <Route path='/images/*' element={null}/>
                <Route path='404' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App