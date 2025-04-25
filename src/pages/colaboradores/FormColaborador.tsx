import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Colaborador from "../../models/Colaborador";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlert";
import Setor from "../../models/Setor";

function FormColaborador() {
  const navigate = useNavigate();

  const [colaborador, setColaborador] = useState<Colaborador>(
    {} as Colaborador
  );

  const [setores, setSetores] = useState<Setor[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/colaborador/${id}`, setColaborador, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarSetores() {
    try {
      await buscar("/setores", setSetores, {
        headers: {
          Authorization: token,
        },
      });
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

  useEffect(() => {
    buscarSetores();
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
    });
  }

  function atualizarSetor(e: ChangeEvent<HTMLSelectElement>) {
    const setorSelecionado = setores.find(
      (setor) => setor.id === Number(e.target.value)
    );
    if (setorSelecionado) {
      setColaborador({
        ...colaborador,
        setor: setorSelecionado,
      });
    }
  }

  function retornar() {
    navigate("/colaboradores");
  }

  async function gerarNovoColaborador(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Associa o colaborador ao usuário logado para controle de quem cadastrou
    const colaboradorComUsuario = {
      ...colaborador,
      usuario: usuario
    };

    if (id !== undefined) {
      try {
        await atualizar(`/colaborador`, colaboradorComUsuario, setColaborador, {
          headers: { Authorization: token },
        });
        ToastAlerta(
          "O cadastro do colaborador foi atualizado com sucesso!",
          "sucesso"
        );
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o cadastro do colaborador.", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/colaborador`, colaboradorComUsuario, setColaborador, {
          headers: { Authorization: token },
        });
        ToastAlerta("O colaborador foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o colaborador.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined
          ? "Cadastrar colaborador"
          : "Editar cadastro colaborador"}
      </h1>

      <form
        className="w-1/2 flex flex-col gap-4"
        onSubmit={gerarNovoColaborador}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nomeColaborador">Qual o Nome do Colaborador</label>
          <input
            type="text"
            placeholder="Insira aqui o nome do colaborador..."
            name="nomeColaborador"
            className="border-2 border-slate-700 rounded p-2"
            value={colaborador.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="salario">Qual o Salário do Colaborador?</label>
          <input
            type="number"
            placeholder="Insira aqui o salário do colaborador..."
            name="salario"
            className="border-2 border-slate-700 rounded p-2"
            value={colaborador.salario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dataDeNascimento">Qual a Data de Nascimento?</label>
          <input
            type="date"
            placeholder="Insira aqui a data de nascimento do colaborador..."
            name="dataDeNascimento"
            className="border-2 border-slate-700 rounded p-2"
            value={colaborador.dataDeNascimento}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cargo">Qual o Cargo do Colaborador?</label>
          <input
            type="text"
            placeholder="Insira aqui o cargo do colaborador..."
            name="cargo"
            className="border-2 border-slate-700 rounded p-2"
            value={colaborador.cargo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="setor">Selecione um Setor</label>
            <select
                name="setor"
                id="setor"
                className="border p-2 border-slate-800 rounded"
                value={colaborador.setor?.id || ""}
                onChange={(e) => atualizarSetor(e)}
            >
                <option value="" disabled>Selecione um Setor</option>
                {setores.map((setor) => (<option key={setor.id} value={setor.id}>
                    {setor.nome}
                </option>
                ))}
            </select>
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormColaborador;
