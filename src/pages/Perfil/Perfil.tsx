import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import { ToastAlerta } from "../../utils/ToastAlert"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useAuth()

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center mx-4">
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
                <img
                    className="w-full h-72 object-cover border-b-8 border-b-purple-100"
                    src="https://cdn.gamma.app/lfvchu1jv5pw1yk/generated-images/WufWZxodMB_k2E16LQmzT.png"
                    alt="Capa do Perfil"
                />

                <img
                    className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
                    src={usuario.foto}
                    onError={(e) => { e.currentTarget.src = "/userperfil.png" }} 
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#150425] text-white text-2xl items-center justify-center"
                >
                    <p>Nome: {usuario.nome} </p>
                    <p>Email: {usuario.usuario}</p>
                </div>
            </div>
        </div>
    )
}

export default Perfil