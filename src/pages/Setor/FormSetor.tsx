import { ChangeEvent, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import Setor from "../../models/Setor";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlert";


function FormSetor() {

    const navigate = useNavigate();

    const [setor, setSetor] = useState<Setor>({} as Setor)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useAuth();
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/setores/${id}`, setSetor, {
                headers: { Authorization: token }
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setSetor({
            ...setor,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/setores")
    }

    async function gerarNovoSetor(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/setores`, setor, setSetor, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Setor foi atualizado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Setor.', 'erro')
                }

            }
        } else {
            try {
                await cadastrar(`/setores`, setor, setSetor, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('Setor cadastrado com sucesso!', 'cadastro')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar Setor.', 'erro')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto p-10">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Setor' : 'Editar Setor'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoSetor}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="setorNome">Nome do Setor</label>
                    <input
                        type="text"
                        placeholder="Insira como o setor se chamará..."
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={setor.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Setor</label>
                    <input
                        type="text"
                        placeholder="Descreva o Setor"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={setor.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-[#5D2C73] hover:bg-[#392359] w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormSetor;