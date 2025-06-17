import admin from "firebase-admin";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getApps } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json";

let firestore: Firestore;
const currentApp = getApps();
let auth: Auth;
if (!currentApp.length) {
	const app = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	});
	firestore = getFirestore(app);
	auth = getAuth(app);
} else {
	const app = currentApp[0];
	firestore = getFirestore(app);
	auth = getAuth(app);
}

const getTotalPages = async (
	firestoreQuery: FirebaseFirestore.Query<
		FirebaseFirestore.DocumentData,
		FirebaseFirestore.DocumentData
	>,
	pageSize: number
) => {
	const queryCount = firestoreQuery.count();
	const countSnapshot = await queryCount.get();
	const countData = countSnapshot.data();
	const total = countData.count;
	const totalPages = Math.ceil(total / pageSize);
	return totalPages;
};

const totalPages = async (collectionName: string, pageSize: number) => {
	const dataCollection = firestore.collection(collectionName);
	const count = await dataCollection.count().get();
	const numPages = Math.ceil(count.data().count / pageSize);
	return numPages;
};

export { firestore, auth, getTotalPages, totalPages };
