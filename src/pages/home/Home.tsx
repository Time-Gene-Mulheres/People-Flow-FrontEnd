import { Cake, SuitcaseSimple } from '@phosphor-icons/react'
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { buscar } from '../../services/Service';
import { Link, useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlert';
import Colaborador from '../../models/Colaborador';
import Setor from '../../models/Setor';
import { RotatingLines } from 'react-loader-spinner';

function Home() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useAuth();
    const token = usuario.token;

    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [setores, setSetores] = useState<Setor[]>([])
    const [loadingColaboradores, setLoadingColaboradores] = useState<boolean>(false)
    const [loadingSetores, setLoadingSetores] = useState<boolean>(false)

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado.', 'info')
            navigate('/login');
        }
    }, [token, navigate]);

    const buscarColaboradores = useCallback(async () => {
        setLoadingColaboradores(true);
        try {
            await buscar('/colaboradores', setColaboradores, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
                ToastAlerta('Erro ao carregar colaboradores.', 'erro')
            }
        } finally {
            setLoadingColaboradores(false);
        }
    }, [token, handleLogout]);

    const buscarSetores = useCallback(async () => {
        setLoadingSetores(true);
        try {
            await buscar('/setores', setSetores, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
                ToastAlerta('Erro ao carregar setores.', 'erro')
            }
        } finally {
            setLoadingSetores(false);
        }
    }, [token, handleLogout]);

    useEffect(() => {
        if (token !== '') {
            buscarColaboradores();
            buscarSetores();
        }
    }, [token, buscarColaboradores, buscarSetores]);

    const totalFuncionarios = colaboradores.length;
    const totalSetores = setores.length;
    const folhaSalarial = colaboradores.reduce((total, colaborador) => total + colaborador.salario, 0);
    const mediaSalarial = totalFuncionarios > 0 ? folhaSalarial / totalFuncionarios : 0;

    const colaboradoresSemSetor = colaboradores.filter(colaborador => !colaborador.setor || colaborador.setor.id === 0);

    const proximosAniversarios = colaboradores
        .filter(colaborador => {
            const hoje = new Date();
            const dataDeNascimento = new Date(colaborador.dataDeNascimento);

            const aniversarioEsteAno = new Date(
                hoje.getFullYear(),
                dataDeNascimento.getMonth(),
                dataDeNascimento.getDate()
            );

            if (aniversarioEsteAno < hoje) {
                aniversarioEsteAno.setFullYear(hoje.getFullYear() + 1);
            }

            const diffTime = aniversarioEsteAno.getTime() - hoje.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays <= 30;
        })
        .sort((a, b) => {
            const dataA = new Date(a.dataDeNascimento);
            const dataB = new Date(b.dataDeNascimento);

            if (dataA.getMonth() !== dataB.getMonth()) {
                return dataA.getMonth() - dataB.getMonth();
            }
            return dataA.getDate() - dataB.getDate();
        })
        .slice(0, 5);

    const isLoadingGeral = loadingColaboradores || loadingSetores;

    return (
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col py-10">
                <div>
                    <h1 className='text-4xl font-bold text-[#392359]'>Dashboard</h1>
                </div>
                <div className='flex flex-col py-10 gap-20'>
                    <div className='justify-between gap-5 grid grid-cols-4 text-lg text-white'>

                        <Link to="/colaboradores">
                            <div className='border border-[#69468d] border-3 rounded-lg p-5 flex flex-col items-center justify-center gap-2 bg-[#7B51A6] hover:shadow-xl/30 hover:shadow-purple-400 hover:rounded-lg'>
                                <h2 className='font-medium text-white'>Total de Funcionários</h2>
                                <p className='text-4xl font-semibold text-white'>
                                    {isLoadingGeral ?
                                        <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                                        <span>{totalFuncionarios}</span>
                                    }
                                </p>
                            </div>
                        </Link>

                        <Link to="/setores">
                            <div className='border border-[#69468d] border-3 rounded-lg p-5 flex flex-col items-center justify-center gap-2 bg-[#7B51A6] hover:shadow-xl/30 hover:shadow-purple-400 hover:rounded-lg'>
                                <h2 className='font-medium'>Total de Setores</h2>
                                <p className='text-4xl font-semibold'>
                                    {isLoadingGeral ?
                                        <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                                        <span>{totalSetores}</span>
                                    }
                                </p>
                            </div>
                        </Link>

                        <div className='border border-[#69468d] border-3 rounded-lg p-5 flex flex-col items-center justify-center gap-2 bg-[#7B51A6] hover:shadow-xl/30 hover:shadow-purple-400 hover:rounded-lg'>
                            <h2 className='font-medium'>Folha Salarial</h2>
                            <p className='text-4xl font-semibold'>
                                {isLoadingGeral ?
                                    <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                                    <span>{folhaSalarial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                }
                            </p>
                        </div>
                        <div className='border border-[#69468d] border-3 rounded-lg p-5 flex flex-col items-center justify-center gap-2 bg-[#7B51A6] hover:shadow-xl/30 hover:shadow-purple-400 hover:rounded-lg'>
                            <h2 className='font-medium'>Média Salarial</h2>
                            <p className='text-4xl font-semibold'>
                                {isLoadingGeral ?
                                    <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                                    <span>{mediaSalarial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                }
                            </p>
                        </div>
                    </div>

                    <div className='rounded-lg flex flex-col gap-5'>
                        <div className='flex flex-row gap-3 items-end'>
                            <Cake size={32} color='#8B2E8C' />
                            <h2 className='text-3xl font-semibold text-[#392359]'>Próximos Aniversários</h2>
                        </div>
                        <div className="overflow-y-scroll bg-white rounded-lg shadow-md max-h-100">
                            {isLoadingGeral ? (
                                <div className="flex justify-center">
                                    <RotatingLines strokeColor="#392359" strokeWidth="5" animationDuration="0.75" width="48" visible={true} />
                                </div>
                            ) : (
                                <table className="w-full table-fixed border-collapse">
                                    <thead className='bg-[#392359] text-white rounded-t-2xl sticky top-0'>
                                        <tr>
                                            <th className="p-4 text-left w-[30%]">Nome</th>
                                            <th className="p-4 text-left w-[25%]">Data</th>
                                            <th className="p-4 text-left w-[25%]">Setor</th>
                                            <th className="p-4 text-left w-[20%]">Cargo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* AQUI: Lógica de renderização condicional corrigida */}
                                        {proximosAniversarios.length > 0 ? (
                                            proximosAniversarios.map((colaborador, index) => (
                                                <tr key={colaborador.id} className={index % 2 === 0 ? "bg-[#F1E6FB]" : "bg-white"}>
                                                    <td className="p-4">{colaborador.nome}</td>
                                                    <td className="p-4">
                                                        {new Intl.DateTimeFormat(undefined, {
                                                            dateStyle: 'full',
                                                        }).format(new Date(colaborador.dataDeNascimento))}
                                                    </td>
                                                    <td className="p-4">{colaborador.setor?.nome}</td>
                                                    <td className="p-4">{colaborador.cargo}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                {/* Mensagem quando não há aniversariantes */}
                                                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                                                    Não há aniversários nos próximos 30 dias...
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    <div className='rounded-lg flex flex-col gap-5'>
                        <div className='text-3xl font-semibold text-[#392359] flex items-end gap-3'>
                            <SuitcaseSimple size={32} color='#8B2E8C' />
                            <h2>Colaboradores por Setor</h2>
                        </div>
                        <div className="overflow-y-scroll bg-white rounded-lg shadow-md max-h-100">
                            {isLoadingGeral ? (
                                <div className="flex justify-center">
                                    <RotatingLines strokeColor="#392359" strokeWidth="5" animationDuration="0.75" width="48" visible={true} />
                                </div>
                            ) : (
                                <table className="w-full table-auto border-collapse">
                                    <thead className='bg-[#392359] text-white rounded-t-2xl sticky top-0'>
                                        <tr>
                                            <th className="p-4 text-left">Setor</th>
                                            <th className="p-4 text-left">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {setores.map((setor, index) => {
                                            const qtdFuncionarios = colaboradores.filter(colaborador => colaborador.setor?.id === setor.id).length;
                                            return (
                                                <tr key={setor.id} className={index % 2 === 0 ? "bg-[#F1E6FB]" : "bg-white"}>
                                                    <td className='p-4'>{setor.nome}</td>
                                                    <td className='p-4'>{qtdFuncionarios} funcionários</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;