// // Import the functions you need from the SDKs you need
// import { getApp, getApps, initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: "",
// };

// // --- KODE MOCK UNTUK BYPASS FIREBASE ---

// // Kita buat objek kosong agar file lain yang meng-import tidak error
// const db: any = {}; 
// const auth: any = {
//   currentUser: null,
//   onAuthStateChanged: (callback: any) => {
//     // Berpura-pura tidak ada user yang login agar tidak memicu error auth
//     return () => {};
//   }
// };
// const googleProvider = {};
// const githubProvider = {};

// // Export kembali variabel yang dibutuhkan aplikasi
// export { db, auth, googleProvider, githubProvider };



import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // ... isi config lo jangan dihapus ...
};

// Cek biar nggak inisialisasi dua kali
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// INI KUNCI BUAT LOGIN GOOGLE & GITHUB (TS2345 FIX)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, db, auth, googleProvider, githubProvider };