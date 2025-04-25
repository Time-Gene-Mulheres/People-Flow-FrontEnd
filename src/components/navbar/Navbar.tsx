import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ReactNode, useContext } from "react";
import { ToastAlerta } from "../../utils/ToastAlert";
import { Users } from "phosphor-react";

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
<button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
    Perfil
</button>
        </Link>

            <Link to="/setores" className="text-white hover:underline">
            <button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Setor
            </button>

        </Link>

            <Link to="/colaboradores" className="text-white hover:underline">
            <button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
    <Users size={20} />  Colaborador
            </button>

            </Link>
            <button onClick={logout} className="text-white hover:underline">
    
            </button> <button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
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