// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBTFSgkHwXW-yukHSZyUAkO3vpqDr_0qVI',
	authDomain: 'ts-gymproject.firebaseapp.com',
	projectId: 'ts-gymproject',
	storageBucket: 'ts-gymproject.firebasestorage.app',
	messagingSenderId: '614702515439',
	appId: '1:614702515439:web:4357bcb112316ec51fc71a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }

export const googleProvider = new GoogleAuthProvider()
export const gitHubProvider = new GithubAuthProvider()
