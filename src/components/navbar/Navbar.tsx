import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                <Link to='/home' className="text-2xl font-bold">People Flow</Link>
                    <div className='flex gap-4'>
                    <Link to="/setor" className="text-indigo-800 hover:underline">
                    Setor
                    </Link>
                    <Link to="/usuario" className="text-indigo-800 hover:underline">
                    Usuário
                    </Link>
                    <Link to="/cadastro" className="text-indigo-800 hover:underline">
                     Cadastro
                    </Link>
                    <Link to="/login" className="text-indigo-800 hover:underline">
                    Login
                    </Link>
                    <Link to="/sair" className="text-indigo-800 hover:underline">
                    Sair
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar