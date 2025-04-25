import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Colaborador from "../../models/Colaborador";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlert";
import { DNA } from "react-loader-spinner";
import CardColaborador from "./CardColaborador";

function ListaColaboradores() {

    const navigate = useNavigate();

    const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

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

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado','info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarColaboradores()
    }, [colaboradores.length])

    return (
        <>
            {colaboradores.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div>
                        <Link to="/cadastrarcolaborador">Cadastrar Colaborador</Link>
                    </div>
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >   
                        {colaboradores.map((colaborador) => (
                            <CardColaborador key={colaborador.id} colaborador={colaborador} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaColaboradores;