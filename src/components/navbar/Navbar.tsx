import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode, useContext } from "react";

function Navbar() {
    
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (

            <div className='w-full flex justify-center py-4
            			    bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">People Flow</Link>

                    <div className='flex gap-4'>
                    <Link to="/setor" className="hover:underline">Setor</Link>
                    <Link to='/cadastrarsetor' className='hover:underline'>Cadastrar Setor</Link>
                    <Link to="/usuario" className="hover:underline">Usuário</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to="/cadastro" className="hover:underline">Cadastro</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>            
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            { component }
        </>
    )
}

export default Navbar