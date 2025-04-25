// import { Link } from 'react-router-dom'
// import Colaborador from '../../models/Colaborador'
// import { User } from 'phosphor-react'
// import img from "/user.svg"

//     interface CardColaboradorProps {
//         colaborador: Colaborador
//     }

// function CardColaborador({ colaborador }: CardColaboradorProps) {



//     return (
//         <div className='border-slate-900 border 
//             flex flex-col rounded overflow-hidden justify-between'>
                
//             <div>
//                 <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
//                     {/* <div>
//                     {colaborador.usuario?.foto === '' ? 
//                         <User size={32} /> :
//                         <img
//                             src={colaborador.usuario.foto}
//                             className='h-12 rounded-full'
//                             alt={colaborador.usuario?.nome} 
//                         />
//                     }
//                     </div> */}

//                     <img src={colaborador.usuario?.foto} onError={(e) => { e.currentTarget.src = "/user.svg" }} className='rounded-full w-12' alt="" />

//                     <h3 className='text-lg font-bold text-center uppercase'>
//                         {colaborador.usuario?.nome}
//                     </h3>
//                 </div>
//                 <div className='p-4 '>
//                     <h4 className='text-lg font-semibold uppercase'>{colaborador.nome}</h4>
//                     <p>{colaborador.cargo}</p>
//                     <p>Setor: {colaborador.setor?.nome}</p>
//                     <p>Salario: {colaborador.salario.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>
//                     <p>Data de Nascimento: {new Intl.DateTimeFormat(undefined, {
//                         dateStyle: 'long'
//                     }).format(new Date(colaborador.dataDeNascimento))}</p>
                    
//                 </div>
//                 <Link to={`/colaboradores/reajuste/${colaborador.id}`} >Atualizar Salario</Link>
//             </div>
//             <div className="flex">
//             <Link to={`/editarcolaborador/${colaborador.id}`}
//                 className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
//                 flex items-center justify-center py-2'>
//                 <button>Editar</button>
//             </Link>
//             <Link to={`/deletarcolaborador/${colaborador.id}`} 
//                 className='text-white bg-red-400 
//                 hover:bg-red-700 w-full flex items-center justify-center'>
//                 <button>Deletar</button>
//             </Link>
//             </div>
//         </div>
//     )

// }
// export default CardColaborador


import { Link } from 'react-router-dom';
import Colaborador from '../../models/Colaborador';
import { User } from 'phosphor-react';
import img from "/user.svg";

interface CardColaboradoresProps {
  colaboradores: Colaborador[];
}

function CardColaboradores({ colaboradores }: CardColaboradoresProps) {
  return (
    <div className="flex flex-col justify-between py-10">
      <h2 className="text-3xl font-bold text-center text-[#5D2C73] mb-4">Colaboradores</h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-[#392359] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Foto</th>
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
            <tr key={colaborador.id} className={index % 2 === 0 ? "bg-[#F1E6FB]" : "bg-white"}>
              <td className="py-2 px-4">
                <img 
                  src={colaborador.usuario?.foto || img} 
                  onError={(e) => { e.currentTarget.src = "/user.svg" }} 
                  className="rounded-full w-12" 
                  alt={colaborador.usuario?.nome} 
                />
              </td>
              <td className="py-2 px-4">{colaborador.usuario?.nome}</td>
              <td className="py-2 px-4">{colaborador.nome}</td>
              <td className="py-2 px-4">{colaborador.cargo}</td>
              <td className="py-2 px-4">{colaborador.setor?.nome}</td>
              <td className="py-2 px-4">{colaborador.salario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
              <td className="py-2 px-4">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: 'long',
                }).format(new Date(colaborador.dataDeNascimento))}
              </td>
              <td className="py-2 px-4">
                <div className="flex gap-4">
                  <Link to={`/colaboradores/reajuste/${colaborador.id}`} className="text-indigo-400 hover:text-indigo-600">Atualizar Salário</Link>
                  <Link to={`/editarcolaborador/${colaborador.id}`} className="text-indigo-400 hover:text-indigo-600">Editar</Link>
                  <Link to={`/deletarcolaborador/${colaborador.id}`} className="text-red-400 hover:text-red-600">Deletar</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardColaboradores;
