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

export async function getResponse(email: string, exam: string) {
	const q = query(examsRef, where('email', '==', email));

	const snapshot: QuerySnapshot = await getDocs(q);
	if (snapshot.empty) return null;
	else return snapshot.docs;
}
