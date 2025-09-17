import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreatePrefectureDto {
	@IsNotEmpty()
	nome: string;

	@IsNotEmpty()
	cnpj: string;

	@IsNotEmpty()
	endereco: string;

	@IsOptional()
	telefone?: string;

	@IsOptional()
	@IsEmail()
	email?: string;
}
