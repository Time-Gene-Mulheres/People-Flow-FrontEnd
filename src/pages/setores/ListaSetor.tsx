// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import CardSetor from "./CardSetor";
// import Setor from "../../models/Setor";
// import { AuthContext } from "../../contexts/AuthContext";
// import { buscar } from "../../services/Service";
// import { DNA } from "react-loader-spinner";

// function ListaSetor() {

//     const navigate = useNavigate();

//     const [setores, setSetores] = useState<Setor[]>([])

//     const { usuario, handleLogout } = useContext(AuthContext)
//     const token = usuario.token

//     async function buscarSetor() {
//         try {
//             await buscar('/setores', setSetores, {
//                 headers: { Authorization: token }
//             })
//         } catch (error: any) {
//             if (error.toString().includes('403')) {
//                 handleLogout()
//             }
//         }
//     }

//     useEffect(() => {
//         if (token === '') {
//             alert('Você precisa estar logado!')
//             navigate('/')
//         }
//     }, [token])

//     useEffect(() => {
//         buscarSetor()    
//     }, [setores.length])
    
//     return (
//         <>
//         {setores.length === 0 && (
//             <DNA
//             visible={true}
//             height="200"
//             width="200"
//             ariaLabel="dna-loading"
//             wrapperStyle={{}}
//             wrapperClass="dna-wrapper mx-auto"
//         />
//         )}
//             <div className="flex justify-center w-full my-4">
//                 <div className="container flex flex-col">
                    
//                     <div>
//                         <Link to="/cadastrarsetor">Cadastrar Setor</Link>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                        {setores.map((setor) => (
//                             <CardSetor key={setor.id} setor={setor} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ListaSetor;


import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TabelaSetores from "./CardSetor"; // Atualizado o nome do componente
import Setor from "../../models/Setor";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { DNA } from "react-loader-spinner";
import CardSetor from "./CardSetor";

function ListaSetor() {
  const navigate = useNavigate();
  const [setores, setSetores] = useState<Setor[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarSetor() {
    try {
      await buscar('/setores', setSetores, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarSetor();
  }, [setores.length]);

  return (
    <>
      {setores.length === 0 && (
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
        <div className="container flex flex-col">
          <div>
            <Link to="/cadastrarsetor">
                <button className="bg-[#150425] text-white border border-[#5D2C73] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span className="bg-[#8D5ABF] shadow-[#8D5ABF] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        Cadastrar Setor
                </button>
            </Link>

          </div>
          <CardSetor setores={setores} />
        </div>
      </div>
    </>
  );
}

export default ListaSetor;
