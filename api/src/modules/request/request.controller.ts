import { Controller, Get, Post, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RequestService } from './request.service';
import { Denuncia } from './request.interface';

@Controller('request')
export class RequestController {
	constructor(private readonly requestService: RequestService) { }

	@Get('health')
	healthCheck() {
		return { status: 'ok', timestamp: new Date().toISOString() };
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Denuncia & { id: string }> {
		const denuncia = await this.requestService.findOne(id);
		if (!denuncia) {
			throw new HttpException('Denúncia não encontrada', HttpStatus.NOT_FOUND);
		}
		return denuncia;
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() data: Partial<Denuncia>) {
		const denuncia = await this.requestService.findOne(id);
		if (!denuncia) {
			throw new HttpException('Denúncia não encontrada', HttpStatus.NOT_FOUND);
		}
		return this.requestService.update(id, data);
	}

	@Get()
	async findAll(): Promise<(Denuncia & { id: string })[]> {
		return this.requestService.findAll();
	}
}
