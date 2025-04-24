import Setor from "./Setor";
import Usuario from "./Usuario";

export default interface Colaborador {
    id?: number | null;
    nome: string;
    salario: number;
    dataDeNascimento: string;
    cargo: string;
    setor?: Setor | null;
    usuario?: Usuario | null;
}