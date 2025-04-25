import { Suitcase, TrendUp, Users } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlert';
import Colaborador from '../../models/Colaborador';
import Setor from '../../models/Setor';

function Home() {

    const navigate = useNavigate();

    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [setores, setSetores] = useState<Setor[]>([])

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado.', 'info')
            navigate('/login');
        }
    }, [token])

    async function buscarColaboradores() {
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
        }
    }

    async function buscarSetores() {
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
        }
    }

    useEffect(() => {
        buscarColaboradores()
    }, [colaboradores.length])

    useEffect(() => {
        buscarSetores()
    }, [setores.length])

    const totalFuncionarios = colaboradores.length;
    const totalSetores = setores.length;
    const folhaSalarial = colaboradores.reduce((total, colaborador) => total + colaborador.salario, 0);
    const mediaSalarial = totalFuncionarios > 0 ? folhaSalarial / totalFuncionarios : 0;

    const formatarMoeda = (valor: number) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const formatarData = (dataString: string) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    const proximosAniversarios = colaboradores
    .filter(colaborador => {
        const hoje = new Date();
        const dataDeNascimento = new Date(colaborador.dataDeNascimento);
        
        // Ajustar para o ano atual
        const aniversarioEsteAno = new Date(
            hoje.getFullYear(),
            dataDeNascimento.getMonth(),
            dataDeNascimento.getDate()
        );
        
        // Se o aniversário já passou este ano, considerar para o próximo ano
        if (aniversarioEsteAno < hoje) {
            aniversarioEsteAno.setFullYear(hoje.getFullYear() + 1);
        }
        
        // Calcular a diferença em dias
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

    return (
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col">
                <div>
                    <h1 className='text-3xl font-bold'>Dashboard</h1>
                </div>
                <div className='flex flex-col py-10 gap-20'>
                    <div className='flex flex-row justify-between'>
                        <div className='border rounded-lg p-4 w-75'>
                            <h2>Total de Funcionários</h2>
                            <p>{totalFuncionarios}</p>
                        </div>
                        <div className='border rounded-lg p-4 w-75'>
                            <h2>Total de Setores</h2>
                            <p>{totalSetores}</p>
                        </div>
                        <div className='border rounded-lg p-4 w-75'>
                            <h2>Folha Salarial</h2>
                            <p>{folhaSalarial.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>
                        </div>
                        <div className='border rounded-lg p-4 w-75'>
                            <h2>Média Salarial</h2>
                            <p>{mediaSalarial.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>
                        </div>
                    </div>

                    <div>
                        <h2>Próximos Aniversários</h2>
                        {proximosAniversarios.length > 0 ? (
                            <table className="customTable">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Setor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proximosAniversarios.map((colaborador) => (
                                        <tr key={colaborador.id}>
                                            <td>{colaborador.nome}</td>
                                            <td>{formatarData(colaborador.dataDeNascimento)}</td>
                                            <td>{colaborador.setor.nome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Não há aniversários nos próximos 30 dias...</p>
                        )}
                    </div>
                    <div className='flex flex-col justify-between py-10'>
                        <h2>Colaboradores por Setor</h2>
                        <table className="customTable">
                            <thead>
                                <tr>
                                    <th>Setor</th>
                                    <th>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setores.map((setor) => {
                                    const qtdFuncionarios = colaboradores.filter(colaborador => colaborador.setor.id === setor.id).length;
                                    return (
                                        <tr key={setor.id}>
                                            <td>{setor.nome}</td>
                                            <td>{qtdFuncionarios} funcionários</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home