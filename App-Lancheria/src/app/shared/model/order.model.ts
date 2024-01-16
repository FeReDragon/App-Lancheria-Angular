

export interface OrderItem {
    produtoId: number;
    quantidade: number;
    preco: number; // Preço por item
    nome: string; 
}

export interface Order {
    id?: number;
    usuarioId?: number;
    itens: OrderItem[];
    dataPedido: Date;
    status: string;
    total: number;

    bairro: string;
    endereco: string;
    observacoes: string;
    cep: string;
    whatsapp: string;
    metodoPagamento: string;
    taxaEntrega?: number;
}

