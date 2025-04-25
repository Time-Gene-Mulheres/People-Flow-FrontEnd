import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode, useContext } from "react";
import { ToastAlerta } from "../../utils/ToastAlert";

function Navbar() {
    
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (

            <div className='w-full flex justify-center py-4
                bg-[#392359] text-white'>
        <div className="container flex justify-between text-lg">
        <Link to='/home' className="text-2xl font-bold">People Flow</Link>

            <div className='flex gap-4'>
            <Link to="/perfil" className="text-white hover:underline">
            Perfil
            </Link>
            <Link to="/setores" className="text-white hover:underline">
            Setor
            </Link>
            <Link to="/colaboradores" className="text-white hover:underline">
            Colaborador
            </Link>
            <button onClick={logout} className="text-white hover:underline">
            Sair
            </button>
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