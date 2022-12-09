import {
  collection,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
} from "@firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../components/Firebase";
import { AnswerState } from "./questions";
import { db } from "@components/Firebase";

export const examsRef = collection(db, "Exams");

export function getQueryEmailExam(email: string, exam: string) {
  return query(
    examsRef,
    where("email", "==", email),
    where("exam", "==", exam)
  );
}
async function getSnapshotEmailExam(email: string, exam: string) {
  const q = getQueryEmailExam(email, exam);
  return await getDocs(q);
}

export async function getResponse(email: string, exam: string) {
  const snapshot = await getSnapshotEmailExam(email, exam);
  if (snapshot.empty) return null;
  else return snapshot.docs.shift()?.data();
}

export async function getID(email: string, exam: string) {
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
    if (import.meta.env.PROD) {
      logEvent(analytics, "new_contest_added", { email, exam });
    }
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
