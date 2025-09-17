export interface Denuncia {
	titulo: string;
	descricao: string;
	localizacao: string; // lat,lng
	status?: 'registrada' | 'em_analise' | 'resolvida';
	prioridade?: 'baixa' | 'media' | 'alta';
	criadoEm?: Date;
}
