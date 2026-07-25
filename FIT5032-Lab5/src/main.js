// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAx87zPWCr55zSHjW6e7yE5JfVi-ot17o",
  authDomain: "fit5032-lab7-kexinji.firebaseapp.com",
  projectId: "fit5032-lab7-kexinji",
  storageBucket: "fit5032-lab7-kexinji.firebasestorage.app",
  messagingSenderId: "605899006830",
  appId: "1:605899006830:web:9260291cb26c9f8bf2d77f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')