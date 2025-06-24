// src/pages/colaboradores/ReajusteColaborador.tsx (VERSÃO ATUALIZADA)

import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Colaborador from '../../models/Colaborador';
import { buscar, atualizar } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlert';

function ReajusteColaborador() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [colaborador, setColaborador] = useState<Colaborador>({} as Colaborador);
  
  // NOVO ESTADO para guardar o valor da porcentagem
  const [porcentagem, setPorcentagem] = useState<number>(0);

  async function buscarColaboradorPorId(id: string) {
    try {
      await buscar(`/colaboradores/${id}`, setColaborador, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
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
    if (id !== undefined) {
      buscarColaboradorPorId(id);
    }
  }, [id]);

  async function reajustar(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // A função PUT agora envia um corpo (body) com a porcentagem
      await atualizar(`/colaboradores/reajuste/${id}`, { porcentagem }, setColaborador, {
        headers: { Authorization: token },
      });
      ToastAlerta('Salário reajustado com sucesso!', 'sucesso');
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        ToastAlerta('Erro ao reajustar o salário.', 'erro');
      }
    }

    retornar();
  }

  function retornar() {
    navigate('/colaboradores');
  }

  return (
    <div className='container flex flex-col mx-auto items-center'>
      <h1 className='text-4xl text-center my-4'>Reajustar Salário</h1>
      <p className='text-center font-semibold mb-4'>
        Você está reajustando o salário do colaborador: {colaborador.nome}
      </p>

      <form className="flex flex-col justify-center w-1/2 gap-4" onSubmit={reajustar}>
        <div className="flex flex-col gap-2">
          
          {/* NOVO CAMPO DE INPUT PARA A PORCENTAGEM */}
          <label htmlFor="porcentagem">Porcentagem de Reajuste (%)</label>
          <input
            type="number"
            id="porcentagem"
            name="porcentagem"
            placeholder="Ex: 15"
            className="border-2 border-slate-700 rounded p-2"
            value={porcentagem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPorcentagem(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="flex justify-around w-full gap-8">
          <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={retornar}>
            Não
          </button>
          <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2' type="submit">
            Sim
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReajusteColaborador;