import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('prefectures')
export class Prefecture {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	nome: string;

	@Column({ unique: true })
	cnpj: string;

	@Column()
	endereco: string;

	@Column({ nullable: true })
	telefone?: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ nullable: true })
	chaveApi?: string; // chave que pode ser usada para manipular/validar requisições

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
