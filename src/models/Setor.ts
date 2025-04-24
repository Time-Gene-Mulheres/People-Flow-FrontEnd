import Colaborador from './Colaborador';

export default interface Setor {
    id: number;
    nome: string;
    descricao: string;
    colaborador?: Colaborador[] | null;
}