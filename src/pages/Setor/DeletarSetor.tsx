import Setor from "../../models/Setor"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DNA, RotatingLines } from "react-loader-spinner"
import { buscar, deletar } from "../../services/Service"
import { useAuth } from '../../hooks/useAuth'
import { ToastAlerta } from "../../utils/ToastAlert"

function DeletarSetor() {



    const navigate = useNavigate()

    const [setor, setSetor] = useState<Setor>({} as Setor)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useAuth()
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/setores/${id}`, setSetor, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarSetor() {
        setIsLoading(true)

        try {
            await deletar(`/setores/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Setor apagado com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar o setor.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/setores")
    }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" />
                </div>
            ) : (
                <div className="container mx-auto p-8 max-w-2xl bg-[#F1E6FB] rounded-lg shadow-2xl border-4 border-[#392359] text-center">
                    <h1 className="text-4xl font-bold text-[#392359] mb-4">Deletar Setor</h1>
                    <p className="text-xl font-medium text-[#5D2C73] mb-8">
                        Você tem certeza que deseja deletar o setor: <span className="font-bold text-[#392359]">{setor.nome}</span>?
                    </p>

                    <div className="flex justify-center gap-6">
                        <button
                            onClick={retornar}
                            className="bg-white text-[#5D2C73] border border-[#5D2C73] border-b-4 font-bold overflow-hidden relative px-6 py-3 rounded-md hover:brightness-90 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                        >
                            <span className="bg-white shadow-white absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                            Não
                        </button>
                        <button
                            onClick={deletarSetor}
                            className="bg-[#D32F2F] text-white border border-[#B71C1C] border-b-4 font-bold overflow-hidden relative px-6 py-3 rounded-md hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                        >
                            <span className="bg-white shadow-white absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                            Sim
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

   
export default DeletarSetor