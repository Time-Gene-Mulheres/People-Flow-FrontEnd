import { Link } from 'react-router-dom'
import Colaborador from '../../models/Colaborador'

    interface CardColaboradorProps {
        colaborador: Colaborador
    }

function CardColaborador({ colaborador }: CardColaboradoresProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={'https://uploads.diariodopoder.com.br/2024/08/ca434650-mprj-conta-com-robo-de-registro-de-candidaturas-para-identificar-irregularidades-ilustracao-mprj-960x640.jpg'}
                        className='h-12 rounded-full'
                        
                        alt={colaborador.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {colaborador.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{colaborador.nome}</h4>
                    <p>{colaborador.cargo}</p>
                    <p>Setor: {colaborador.setor?.nome}</p>
                    <p>Salario: {colaborador.salario}</p>
                    <p>Data de Nascimento: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(colaborador.data_de_nascimento))}</p>
                    
                </div>
            </div>
            <div className="flex">
            <Link to={`/editarpostagem/${colaborador.id}`}
                className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                flex items-center justify-center py-2'>
                <button>Editar</button>
            </Link>
            <Link to={`/deletarpostagem/${colaborador.id}`} 
                className='text-white bg-red-400 
                hover:bg-red-700 w-full flex items-center justify-center'>
                <button>Deletar</button>
            </Link>
            </div>
        </div>
    )
}

export default CardColaborador