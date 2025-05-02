
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import Colaborador from '../../models/Colaborador';
import { ToastAlerta } from '../../utils/ToastAlert';

function ReajusteColaborador() {

    const navigate = useNavigate();

const [colaborador, setColaborador] = useState<Colaborador>(
    {} as Colaborador
);

const [isLoading, setIsLoading] = useState<boolean>(false);
const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario.token;
const { id } = useParams<{ id: string }>();

async function buscarPorId(id: string) {
    try {
        await buscar(`/colaboradores/${id}`, setColaborador, {
        headers: { Authorization: token },
        });
    } catch (error: any) {
        if (error.toString().includes("403")) {
        handleLogout();
        }
    }
}

async function buscarReajusteColaborador() {
    try {
        await buscar(`/colaboradores/reajuste/${id}`, setColaborador, {
        headers: {
            Authorization: token,
        },
        });
        navigate("/colaboradores")
    } catch (error: any) {
        if (error.toString().includes("403")) {
        handleLogout();
        }
    }
}

useEffect(() => {
    if (token === "") {
        ToastAlerta("Você precisa estar logado!", "erro");
        navigate("/");
    }
}, [token]);

// useEffect(() => {
//     buscarReajusteColaborador();
// }, []);

useEffect(() => {
    if (id !== undefined) {
        buscarPorId(id);
    }
}, [id]);

if (!colaborador || colaborador.salario === undefined) {
    return <p>Carregando dados do colaborador...</p>;
}  

    return (
        <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8 py-10">
            <h1 className="text-xl font-bold mb-4">Reajuste Salarial</h1>
            <p><strong>Nome:</strong> {colaborador.nome}</p>
            <p><strong>Salário Atual:</strong> R$ {colaborador.salario.toFixed(2)}</p>
            <button
                onClick={buscarReajusteColaborador}
                className="mt-4 text-white px-4 py-2 rounded bg-[#392359] hover:bg-[#5D2C73] transition">
                Aplicar Reajuste de 10%
            </button>

        </div>
    );
}

export default ReajusteColaborador;
