import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDenunciaDto {
	@IsNotEmpty()
	@IsString()
	titulo: string;

	@IsNotEmpty()
	@IsString()
	descricao: string;

	@IsNotEmpty()
	@IsString()
	localizacao: string; // lat,lng
}
