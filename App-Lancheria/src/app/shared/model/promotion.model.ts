export interface Promotion {
    id: number;
    titulo: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    desconto: number; //porcentagem de desconto
    imagemUrl?: string; // URL opcional para imagem da promoção
    produtosAplicaveis?: number[]; // IDs dos produtos aos quais a promoção se aplica
}
