import {
	collection,
	getFirestore,
	query,
	where,
	getDocs,
	QuerySnapshot,
} from '@firebase/firestore';

const db = getFirestore();

const examsRef = collection(db, 'Exams');

export async function getExamsSolved(email: string) {
	const q = query(examsRef, where('email', '==', email));

	const snapshot: QuerySnapshot = await getDocs(q);
	if (snapshot.empty) return [];
	else {
		return snapshot.docs.map((x) => x.data());
	}
}
