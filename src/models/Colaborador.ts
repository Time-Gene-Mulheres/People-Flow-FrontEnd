
export default interface Colaborador {
    id?: number | null;
    nome: string;
    salario: number;
    data_de_nascimento: string;
    cargo: string;
    setor: Setor;
}