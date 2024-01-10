export interface Fidelity {
    usuarioId: number;
    pontosAcumulados: number;
    nivel: string; // Exemplo: "Bronze", "Prata", "Ouro"
    historicoTransacoes?: FidelityTransaction[]; // Histórico opcional de transações
}

export interface FidelityTransaction {
    data: Date;
    pontos: number; // Pontos ganhos ou gastos
    descricao: string; // Descrição da transação
}
