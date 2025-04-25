// import { Link, useNavigate } from "react-router-dom";
// import { useState, useContext, useEffect } from "react";
// import Colaborador from "../../models/Colaborador";
// import { buscar } from "../../services/Service";
// import { AuthContext } from "../../contexts/AuthContext";
// import { ToastAlerta } from "../../utils/ToastAlert";
// import { DNA } from "react-loader-spinner";
// import CardColaborador from "./CardColaborador";

// function ListaColaboradores() {

//     const navigate = useNavigate();

//     const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

//     const { usuario, handleLogout } = useContext(AuthContext);
//     const token = usuario.token;

//     async function buscarColaboradores() {
//         try {
//             await buscar('/colaboradores', setColaboradores, {
//                 headers: {
//                     Authorization: token,
//                 },
//             })

//         } catch (error: any) {
//             if (error.toString().includes('403')) {
//                 handleLogout()
//             }
//         }
//     }

//     useEffect(() => {
//         if (token === '') {
//             ToastAlerta('Você precisa estar logado','info')
//             navigate('/');
//         }
//     }, [token])

//     useEffect(() => {
//         buscarColaboradores()
//     }, [colaboradores.length])

//     return (
//         <>
//             {colaboradores.length === 0 && (
//                 <DNA
//                     visible={true}
//                     height="200"
//                     width="200"
//                     ariaLabel="dna-loading"
//                     wrapperStyle={{}}
//                     wrapperClass="dna-wrapper mx-auto"
//                 />
//             )}
//             <div className="flex justify-center w-full my-4">
//                 <div className="container flex flex-col mx-2">
//                     <div>
//                         <Link to="/cadastrarcolaborador">Cadastrar Colaborador</Link>
//                     </div>
//                     <div className='container mx-auto my-4 
//                         grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
//                     >   
//                         {colaboradores.map((colaborador) => (
//                             <CardColaborador key={colaborador.id} colaborador={colaborador} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ListaColaboradores;

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Colaborador from "../../models/Colaborador";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlert";
import { DNA } from "react-loader-spinner";
import { Calculator, Pencil, PencilLine, PencilSimple, Trash } from "phosphor-react";

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
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarColaboradores();
    }, [colaboradores.length]);

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
                    <div className="my-4">
                        <Link
                            to="/cadastrarcolaborador"                        
                        >
                            <button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                                    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                                Cadastrar Colaborador
                                </button>
                        </Link>
         
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead className="bg-[#392359] text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">RH</th>
                                    <th className="py-2 px-4 text-left">Colaborador</th>
                                    <th className="py-2 px-4 text-left">Cargo</th>
                                    <th className="py-2 px-4 text-left">Setor</th>
                                    <th className="py-2 px-4 text-left">Salário</th>
                                    <th className="py-2 px-4 text-left">Data de Nascimento</th>
                                    <th className="py-2 px-4 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colaboradores.map((colaborador, index) => (
                                    <tr
                                        key={colaborador.id}
                                        className={index % 2 === 0 ? "bg-[#F1E6FB]" : "bg-white"}
                                    >
                                        <td className="py-2 px-4">{colaborador.usuario?.nome}</td>
                                        <td className="py-2 px-4">{colaborador.nome}</td>
                                        <td className="py-2 px-4">{colaborador.cargo}</td>
                                        <td className="py-2 px-4">{colaborador.setor?.nome}</td>
                                        <td className="py-2 px-4">
                                            {colaborador.salario.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </td>
                                        <td className="py-2 px-4">
                                            {new Intl.DateTimeFormat(undefined, {
                                                dateStyle: 'long',
                                            }).format(new Date(colaborador.dataDeNascimento))}
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/colaboradores/reajuste/${colaborador.id}`}
                                                    className="text-[#5D2C73] hover:text-[#392359]"
                                                >
                                                    <Calculator size={32} />
                                                </Link>
                                                <Link
                                                    to={`/editarcolaborador/${colaborador.id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                  <PencilLine size={32} />
                                                </Link>
                                                <Link
                                                    to={`/deletarcolaborador/${colaborador.id}`}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash size={32} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaColaboradores;
