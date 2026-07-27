import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDAx87zPWCr55zSHjW6e7yE5JfVi-ot17o',
  authDomain: 'fit5032-lab7-kexinji.firebaseapp.com',
  projectId: 'fit5032-lab7-kexinji',
  storageBucket: 'fit5032-lab7-kexinji.firebasestorage.app',
  messagingSenderId: '605899006830',
  appId: '1:605899006830:web:9260291cb26c9f8bf2d77f'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }