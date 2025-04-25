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
        <div className="w-full flex flex-col justify-center">
            <div className="container">
                <div>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <div>
                        <div>
                            <h2>Total de Funcionários</h2>
                            <p>{totalFuncionarios}</p>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Home