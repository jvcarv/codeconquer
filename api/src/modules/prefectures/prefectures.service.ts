// src/modules/prefectures/prefectures.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { FirestoreService } from '../core/firestore/firestore.service';
import { CreatePrefectureDto } from './dto/create-prefecture.dto';
import { UpdatePrefectureDto } from './dto/update-prefecture.dto';
import { Prefecture } from './entities/prefecture.entity';

@Injectable()
export class PrefecturesService {
	private collectionName = 'prefectures';

	constructor(private readonly firestore: FirestoreService) { }

	async create(dto: CreatePrefectureDto): Promise<Prefecture & { id: string }> {
		const prefecture = {
			...dto,
			createdAt: new Date(),
		};

		const doc = await this.firestore.createDoc(this.collectionName, prefecture);
		return { ...doc } as Prefecture & { id: string };
	}

	async findAll(): Promise<(Prefecture & { id: string })[]> {
		const snapshot = await this.firestore.collection(this.collectionName).get();
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as (Prefecture & { id: string })[];
	}

	async findOne(id: string): Promise<Prefecture & { id: string }> {
		const doc = await this.firestore.getDoc(this.collectionName, id);
		if (!doc) {
			throw new NotFoundException(`Prefeitura ${id} não encontrada`);
		}
		return { ...doc } as Prefecture & { id: string };
	}

	async update(id: string, dto: UpdatePrefectureDto) {
		await this.findOne(id);
		await this.firestore.updateDoc(this.collectionName, id, dto);
		return { id, ...dto };
	}

	async remove(id: string) {
		await this.findOne(id);
		await this.firestore.deleteDoc(this.collectionName, id);
		return { deleted: true };
	}
}
