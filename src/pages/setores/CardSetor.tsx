import { Link } from 'react-router-dom'
import Setor from '../../models/Setor'
import { PencilLine, Trash } from 'phosphor-react';

// interface CardSetoresProps{
//     setor: Setor
// }

// function CardSetor ({ setor }: CardSetoresProps) {
//     return (
//         <div className='border flex flex-col rounded-2xl overflow-hidden justify-between gap-4 bg-slate-200'>
//             <header className='px-6 py-3 bg-indigo-800 text-white font-bold text-2xl'>
//                 Setor
//             </header>
//             <p className='px-6 text-3xl bg-slate-200 h-full'>{setor.nome}</p>
//             <p className='px-6 text-xl bg-slate-200 h-full'>{setor.descricao}</p>
            
//             <div className="flex">
//                 <Link to={`/editarsetor/${setor.id}`} 
//                     className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
//                         flex items-center justify-center py-2'>
//                     <button>Editar</button>
//                 </Link>

//                 <Link to={`/deletarsetor/${setor.id}`}  className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
//                     flex items-center justify-center'>
//                     <button>Deletar</button>
//                 </Link>
//             </div>           

//         </div>

        
//     )
// }

interface CardSetoresProps {
    setores: Setor[];
  }

function CardSetor({ setores }: CardSetoresProps) {
    return (
      <div className="flex flex-col justify-between py-10">
        <h2 className="text-3xl font-bold text-center text-[#5D2C73] mb-4">Setores</h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#392359] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Setor</th>
              <th className="py-2 px-4 text-left">Descrição</th>
              <th className="py-2 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {setores.map((setor, index) => (
              <tr key={setor.id} className={index % 2 === 0 ? "bg-[#F1E6FB]" : "bg-white"}>
                <td className="py-2 px-4">{setor.nome}</td>
                <td className="py-2 px-4">{setor.descricao}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/editarsetor/${setor.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        <PencilLine size={32} />
                      
                    </Link>
                    <Link
                      to={`/deletarsetor/${setor.id}`}
                      className="text-red-600 hover:text-red-800 text-sm"
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
    );
  }






export default CardSetor