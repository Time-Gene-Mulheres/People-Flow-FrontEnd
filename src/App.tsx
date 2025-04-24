
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListaSetor from './components/setores/ListaSetor'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';


function App() {
  return (

    <>
     
      <BrowserRouter>
            <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/setor" element={<ListaSetor />} />

      </Routes>
          <Footer />
      </BrowserRouter>    

    </>
  );
}




export default App;

