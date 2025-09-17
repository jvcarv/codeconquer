import { Module, Global } from '@nestjs/common';
import { FirestoreService } from './firestore/firestore.service';
import { FirestoreModule } from './firestore/firestore.module';

@Global()
@Module({
	imports: [FirestoreModule],
	providers: [FirestoreService],
})
export class CoreModule { }
