// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDoMkHF-XUMX9aSCKbk98QFcfjKGbujLLg",
	authDomain: "fire-homes-55261.firebaseapp.com",
	projectId: "fire-homes-55261",
	storageBucket: "fire-homes-55261.firebasestorage.app",
	messagingSenderId: "565288126280",
	appId: "1:565288126280:web:cab13372c9ecb5f50ed57d",
};

const currentApp = getApps();

let auth: Auth;
let storage: FirebaseStorage;

// Initialize Firebase
if (!currentApp.length) {
	const app = initializeApp(firebaseConfig);
	auth = getAuth(app);
	storage = getStorage(app);
} else {
	const app = currentApp[0];
	auth = getAuth(app);
	storage = getStorage(app);
}

export { auth, storage };
