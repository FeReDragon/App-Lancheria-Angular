export interface OrderItem {
    produtoId: number;
    quantidade: number;
    preco: number; // Preço por item
}

export interface Order {
    id?: number;
    usuarioId?: number;
    itens: OrderItem[];
    dataPedido: Date;
    status: string; // Exemplos: "pendente", "completado", "cancelado", etc.
    total: number; // Soma total do pedido
}
