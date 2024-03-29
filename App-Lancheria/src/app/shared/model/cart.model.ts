export interface CartItem {
    produtoId: number;
    nome: string;
    preco: number; // Preço por item
    quantidade: number;
    imagemUrl?: string;
}

export interface Cart {
    usuarioId: number; // Identificador do usuário ao qual o carrinho pertence
    itens: CartItem[];
    totalItens: number; // Número total de itens no carrinho
    totalPreco: number; // Soma total dos preços dos itens no carrinho
}
