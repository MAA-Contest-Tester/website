import {
	collection,
	doc,
	getFirestore,
	query,
	where,
	getDocs,
	deleteDoc,
	addDoc,
	updateDoc,
} from '@firebase/firestore';
import { AnswerState } from './questions';

const db = getFirestore();

const examsRef = collection(db, 'Exams');

async function getSnapshotEmailExam(email: string, exam: string) {
	const q = query(
		examsRef,
		where('email', '==', email),
		where('exam', '==', exam)
	);
	return await getDocs(q);
}

export async function getResponse(email: string, exam: string) {
	const snapshot = await getSnapshotEmailExam(email, exam);
	if (snapshot.empty) return null;
	else return snapshot.docs.shift()?.data();
}

async function getID(email: string, exam: string) {
	const snapshot = await getSnapshotEmailExam(email, exam);
	if (snapshot.empty) return null;
	else return snapshot.docs.shift()?.id;
}

export async function clearResponse(email: string, exam: string) {
	const response = await getID(email, exam);
	if (response) {
		await deleteDoc(doc(examsRef, response));
	}
}

export async function addExam(
	email: string,
	exam: string,
	answer: (string | null)[],
	correct: AnswerState[],
	score: string,
	notes: string | null
) {
	const response = await getID(email, exam);
	if (!response) {
		// create new document
		await addDoc(examsRef, {
			email: email,
			exam: exam,
			answer: answer,
			correct: correct,
			score: score,
			notes: notes,
		});
	} else {
		// overwrite existing one.
		await updateDoc(doc(examsRef, response), {
			answer: answer,
			correct: correct,
			score: score,
			notes: notes,
		});
	}
}
