import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { FieldValue } from "firebase-admin/firestore";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

function parseMatch(match: string) {
  return match
    .replace(/<ol>/g, "")
    .replace(/<\/ol>/g, "")
    .replace(/<li>/g, "")
    .replace(/<\/li>/g, "")
    .split("\n");
}

async function getAnswers(url: any): Promise<string[]> {
  url = `https://artofproblemsolving.com/wiki/index.php/${url}`;
  try {
    const response = await axios.get(url);
    const re = new RegExp("<ol>[.,\\s,\\S]*</ol>");
    const [match]: [string] = response.data.match(re);
    return parseMatch(match);
  } catch (e) {
    throw e;
  }
}

export const aops = functions.https.onRequest(
  async (request: any, response: any) => {
    response
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Methods", "GET");

    if (typeof request.query.url !== "string") {
      response.status(400).json({ error: "provide a URL." });
    }
    try {
      const ar: string[] = await getAnswers(request.query.url);
      response.status(200).json(ar);
    } catch (e) {
      response.status(404).json(e);
    }
  }
);

export const incrementcount = functions.firestore
  .document("Exams/{examId}")
  .onCreate(async (snapshot, context) => {
    const firestore = admin.firestore();
    if (process.env.FIREBASE_DEBUG_MODE == "true") {
      let document = await firestore.collection("Counts").doc("default").get();
      if (!document.exists) {
        await firestore.collection("Counts").doc("default").set({
          contests: 0,
        });
      }
    }
    await firestore
      .collection("Counts")
      .doc("default")
      .update({
        contests: FieldValue.increment(1),
      });
  });

export const decrementcount = functions.firestore
  .document("Exams/{examId}")
  .onDelete(async (snapshot, context) => {
    const firestore = admin.firestore();
    if (process.env.FIREBASE_DEBUG_MODE == "true") {
      let document = await firestore.collection("Counts").doc("default").get();
      if (!document.exists) {
        await firestore.collection("Counts").doc("default").set({
          contests: 0,
        });
      }
    }
    await firestore
      .collection("Counts")
      .doc("default")
      .update({
        contests: FieldValue.increment(-1),
      });
  });
