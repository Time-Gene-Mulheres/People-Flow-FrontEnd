import Colaborador from "./Colaborador";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    colaborador?: Colaborador[] | null;
}