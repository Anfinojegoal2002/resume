import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Pages/Signup'
import LoGin from './Pages/LoGin'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify'

function App() {
 

  return (
     <>
      
      <ToastContainer />

   <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signup />} />
     <Route path="/login" element={<LoGin/>}/>
     <Route path='/home' element={<Home/>}/>
        


    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
