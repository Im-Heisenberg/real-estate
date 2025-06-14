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

export { firestore, auth };
