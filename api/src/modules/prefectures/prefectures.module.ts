import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrefecturesService } from './prefectures.service';
import { PrefecturesController } from './prefectures.controller';
import { CoreModule } from '../core/core.module';

@Module({
	imports: [CoreModule],
	controllers: [PrefecturesController],
	providers: [PrefecturesService],
	exports: [PrefecturesService],
})
export class PrefecturesModule { }
