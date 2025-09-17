import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
	private db: FirebaseFirestore.Firestore;

	constructor() {
		if (!admin.apps.length) {
			admin.initializeApp({
				credential: admin.credential.applicationDefault(),
				projectId: process.env.GOOGLE_CLOUD_PROJECT || 'denuncias-urbanas',
			});
		} else {
			admin.app();
		}

		this.db = admin.firestore();

		if (process.env.FIRESTORE_EMULATOR_HOST) {
			this.db.settings({
				host: process.env.FIRESTORE_EMULATOR_HOST,
				ssl: false,
			});
		}
	}

	collection(name: string) {
		return this.db.collection(name);
	}

	async getDoc(collection: string, id: string) {
		const doc = await this.db.collection(collection).doc(id).get();
		return doc.exists ? { id: doc.id, ...doc.data() } : null;
	}

	async createDoc(collection: string, data: any) {
		const docRef = await this.db.collection(collection).add(data);
		const doc = await docRef.get();
		return { id: doc.id, ...doc.data() };
	}

	async updateDoc(collection: string, id: string, data: any) {
		const docRef = this.db.collection(collection).doc(id);
		await docRef.update(data);
		const updated = await docRef.get();
		return { id: updated.id, ...updated.data() };
	}

	async deleteDoc(collection: string, id: string) {
		await this.db.collection(collection).doc(id).delete();
		return { id, deleted: true };
	}

	async queryCollection(collection: string, field: string, op: FirebaseFirestore.WhereFilterOp, value: any) {
		const snapshot = await this.db.collection(collection).where(field, op, value).get();
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	}
}
