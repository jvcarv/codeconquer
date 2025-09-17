import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../core/firestore/firestore.service';
import { Denuncia } from './request.interface';
import { CreateDenunciaDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
	private collectionName = 'denuncias';

	constructor(private readonly firestore: FirestoreService) { }

	async create(dto: CreateDenunciaDto): Promise<Denuncia & { id: string }> {
		const request: Denuncia = {
			...dto,
			status: 'registrada',
			criadoEm: new Date(),
		};
		try {
			const doc = await this.firestore.createDoc(this.collectionName, request);
			return { ...doc } as Denuncia & { id: string };
		} catch (error) {
			console.error('Error:', error);
			throw new Error('Error creating document');
		}
	}

	async findOne(id: string): Promise<Denuncia & { id: string } | null> {
		const doc = await this.firestore.getDoc(this.collectionName, id);
		if (!doc) {
			return null;
		}
		return { ...doc } as Denuncia & { id: string };
	}

	async update(id: string, data: Partial<Denuncia>) {
		return this.firestore.updateDoc(this.collectionName, id, data);
	}

	async findAll(): Promise<(Denuncia & { id: string })[]> {
		const snapshot = await this.firestore.collection(this.collectionName).get();
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (Denuncia & { id: string })[];
	}
}
