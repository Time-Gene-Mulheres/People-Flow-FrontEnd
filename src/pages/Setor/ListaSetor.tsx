import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Setor from "../../models/Setor";
import { useAuth } from '../../hooks/useAuth'
import { buscar } from "../../services/Service";
import { DNA } from "react-loader-spinner";
import CardSetor from "./components/CardSetor";

function ListaSetor() {
  const navigate = useNavigate();
  const [setores, setSetores] = useState<Setor[]>([]);

  const { usuario, handleLogout } = useAuth();
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
      <div className="flex justify-center w-full my-4 py-10">
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
