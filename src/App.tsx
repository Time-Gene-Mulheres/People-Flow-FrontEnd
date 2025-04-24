import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'

function App() {

  return (
    <BrowserRouter>
      <div className='min-h[80vh]'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
