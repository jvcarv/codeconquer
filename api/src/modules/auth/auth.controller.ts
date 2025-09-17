import { Controller, Get, Post, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrefecturesService } from '../prefectures/prefectures.service';
import { CreatePrefectureDto } from '../prefectures/dto/create-prefecture.dto';
import { Prefecture } from '../prefectures/entities/prefecture.entity';

@Controller('auth')
export class AuthController {
	constructor(
		// private readonly authService: AuthService
		private readonly prefectureService: PrefecturesService

	) { }

	@Post('register')
	async create(@Body() dto: CreatePrefectureDto): Promise<Prefecture & { id: string }> {
		return this.prefectureService.create(dto);
	}
}
