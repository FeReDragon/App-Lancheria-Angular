export interface PaymentDetails {
    id: number;
    usuarioId: number;
    metodo: string; // Por exemplo, 'Cartão de Crédito', 'dinheiro'
    detalhes: string; // Número do cartão, etc., idealmente armazenados de forma segura
}

export interface Transaction {
    id: number;
    orderId: number;
    pagamentoId: number;
    valor: number;
    dataTransacao: Date;
    status: string; // Por exemplo, 'Aprovado', 'Recusado'
}
