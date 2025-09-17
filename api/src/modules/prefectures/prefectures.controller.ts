import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { PrefecturesService } from './prefectures.service';
import { CreatePrefectureDto } from './dto/create-prefecture.dto';
import { UpdatePrefectureDto } from './dto/update-prefecture.dto';

@Controller('prefectures')
export class PrefecturesController {
	constructor(private readonly prefecturesService: PrefecturesService) { }

	@Get()
	findAll() {
		return this.prefecturesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.prefecturesService.findOne(id);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.prefecturesService.remove(id);
	// }
}

@Controller('me')
export class MeController {
	constructor(private readonly prefecturesService: PrefecturesService) { }

	@Patch('email')
	async updateEmail(@Body('email') email: string, @Req() req: any) {
		// por enquanto simula um id vindo do header ou query
		const prefectureId = req.headers['x-prefecture-id'] || req.query.prefectureId;

		if (!prefectureId) {
			throw new Error('PrefectureId não informado (simulação)');
		}

		return this.prefecturesService.update(prefectureId, { email });
	}
}