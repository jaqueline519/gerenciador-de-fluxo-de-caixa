
export interface Registro {
    id: string;
    descricao?: string;
    tipoDeRegistro?: 'entrada' | 'saida';
    data?: string;
    valor?: number;
    mesAno?: string;
}
