import { MesesDoAno } from "../types/meses-do-ano.type";

export interface Registro {
    id: string;
    descricao?: string;
    tipoDeRegistro?: 'entrada' | 'saida';
    data?: string;
    valor?: number;
    mesAno?: string;
}
