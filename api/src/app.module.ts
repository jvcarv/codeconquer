import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './modules/request/request.module';
import { RequestService } from './modules/request/request.service';
import { PrefecturesModule } from './modules/prefectures/prefectures.module';
import { PrefecturesService } from './modules/prefectures/prefectures.service';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    RequestModule,
    PrefecturesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    PrefecturesService
  ],
})
export class AppModule { }
