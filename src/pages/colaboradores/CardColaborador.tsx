import { Link } from 'react-router-dom'
import Colaborador from '../../models/Colaborador'
import { User } from 'phosphor-react'
import img from "/user.svg"

    interface CardColaboradorProps {
        colaborador: Colaborador
    }

function CardColaborador({ colaborador }: CardColaboradorProps) {



    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    {/* <div>
                    {colaborador.usuario?.foto === '' ? 
                        <User size={32} /> :
                        <img
                            src={colaborador.usuario.foto}
                            className='h-12 rounded-full'
                            alt={colaborador.usuario?.nome} 
                        />
                    }
                    </div> */}

                    <img src={colaborador.usuario?.foto} onError={(e) => { e.currentTarget.src = "/user.svg" }} className='rounded-full w-12' alt="" />

                    <h3 className='text-lg font-bold text-center uppercase'>
                        {colaborador.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{colaborador.nome}</h4>
                    <p>{colaborador.cargo}</p>
                    <p>Setor: {colaborador.setor?.nome}</p>
                    <p>Salario: {colaborador.salario.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</p>
                    <p>Data de Nascimento: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'long'
                    }).format(new Date(colaborador.dataDeNascimento))}</p>
                    
                </div>
                <Link to={`/colaboradores/reajuste/${colaborador.id}`} >Atualizar Salario</Link>
            </div>
            <div className="flex">
            <Link to={`/editarcolaborador/${colaborador.id}`}
                className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                flex items-center justify-center py-2'>
                <button>Editar</button>
            </Link>
            <Link to={`/deletarcolaborador/${colaborador.id}`} 
                className='text-white bg-red-400 
                hover:bg-red-700 w-full flex items-center justify-center'>
                <button>Deletar</button>
            </Link>
            </div>
        </div>
    )

}
export default CardColaborador