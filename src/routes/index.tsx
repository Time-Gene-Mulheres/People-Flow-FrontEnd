// ... (imports das páginas)
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Cadastro from '../pages/cadastro/Cadastro';
import ListaSetor from '../pages/Setor/ListaSetor';
import FormSetor from '../pages/Setor/FormSetor';
import DeletarSetor from '../pages/Setor/DeletarSetor';
import ListaColaboradores from '../pages/Colaborador/ListaColaborador';
import FormColaborador from '../pages/Colaborador/FormColaborador';
import DeletarColaborador from '../pages/Colaborador/DeletarColaborador';
import ReajusteColaborador from '../pages/Colaborador/ReajusteColaborador';
import Perfil from '../pages/Perfil/Perfil';

function AppRoutes() {
  return (

    <BrowserRouter>
      <Navbar />
      <div className='min-h-[80vh]'>
        <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/setores" element={<ListaSetor />} />
                <Route path="/cadastrarsetor" element={<FormSetor/>} />
                <Route path="/editarsetor/:id" element={<FormSetor/>} />
                <Route path="/deletarsetor/:id" element={<DeletarSetor />} />
                <Route path="/colaboradores" element={<ListaColaboradores />} />                
                <Route path="/cadastrarcolaborador" element={<FormColaborador />} />
                <Route path="/editarcolaborador/:id" element={<FormColaborador />} />
                <Route path="/deletarcolaborador/:id" element={<DeletarColaborador />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/colaboradores/reajuste/:id" element={<ReajusteColaborador />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;