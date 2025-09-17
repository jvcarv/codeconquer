import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrefecturesModule } from '../prefectures/prefectures.module';

@Module({
	imports: [PrefecturesModule],
	controllers: [AuthController]
})
export class AuthModule { }
