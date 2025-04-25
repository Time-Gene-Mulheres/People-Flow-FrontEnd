import { Suitcase, TrendUp, Users } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { useNavigate } from 'react-router-dom';
import { ToastAlerta } from '../../utils/ToastAlert';

function Home() {

    const navigate = useNavigate();

    const [colaboradores, setColaboradores] = useState<[]>([])
    const [setores, setSetores] = useState<[]>([])

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado.', 'info')
            navigate('/');
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
            }
        }
    }


    return (
        <div className="w-full flex flex-col justify-center">
            <div className="container">
                <div>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <div>
                        <div>
                            <div>
                                <Users size={32} weight='bold' color='#1f1f45'/>
                            </div>
                            <div>
                                <p>Total de Funcionários</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Suitcase size={32} weight='bold' color='#1f1f45'/>
                            </div>
                            <div>
                                <p>Total de Funcionários</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <TrendUp size={32} weight='bold' color='#1f1f45'/>
                            </div>
                            <div>
                                <p>Total de Funcionários</p>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home