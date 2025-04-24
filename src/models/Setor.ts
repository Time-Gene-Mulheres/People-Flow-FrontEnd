import Colaborador from './Colaborador';

export default interface Setor {
    id?: number | null;
    nome: string;
    descricao: string;
    colaborador?: Colaborador[] | null;
}