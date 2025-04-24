import './App.css'
import ListaSetor from './components/setores/ListaSetor'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Perfil from './pages/usuario/Perfil'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ListaColaborador from './pages/colaboradores/ListaColaborador'
import FormColaborador from './pages/colaboradores/FormColaborador'
import DeletarColaborador from './pages/colaboradores/DeletarColaborados'
import ListaSetor from './components/setores/ListaSetor';
import FormSetor from './pages/setores/FormSetor'
import DeletarSetor from './pages/setores/DeletarSetor'
function App() {

  return (
    <>
      <AuthProvider>
      <ToastContainer/>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/setores" element={<ListaSetor />} />
              <Route path="/cadastrarsetor" element={<FormSetor/>} />
              <Route path="/editarsetor/:id" element={<FormSetor/>} />
              <Route path="/deletarsetor/:id" element={<DeletarSetor />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastrarcolaborador" element={<FormColaborador />} />
              <Route path="/editarcolaborador:id" element={<FormColaborador />} />
              <Route path="/deletarcolaborador:id" element={<DeletarColaborador />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App
