

export interface OrderItem {
    produtoId: number;
    quantidade: number;
    preco: number; // Preço por item
    nome: string; 
}

// order.model.ts
export interface Order {
    id?: number;
    usuarioId?: number;
    itens: OrderItem[];
    dataPedido: Date;
    status: string;
    total: number;

    bairro: string;
    endereco: string;
    cidade: string;
    cep: string;
    metodoPagamento: string;
    taxaEntrega?: number;
}

