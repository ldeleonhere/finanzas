// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAQLNCWEdAA_WB7sKn1YRfuOGhorsRap68",
  authDomain: "proyecto-finanzas-gt.firebaseapp.com",
  projectId: "proyecto-finanzas-gt",
  storageBucket: "proyecto-finanzas-gt.appspot.com",
  messagingSenderId: "1096154282288",
  appId: "1:1096154282288:web:b788993a36ae2c8ee0c691"
  


  /*apiKey: "AIzaSyCHJhriEYwVBAiD1bOtWQ3-1qMPMvXmAkk",
  authDomain: "finanzas-personales-e52f1.firebaseapp.com",
  projectId: "finanzas-personales-e52f1",
  storageBucket: "finanzas-personales-e52f1.appspot.com",
  messagingSenderId: "920996759492",
  appId: "1:920996759492:web:b788993a36ae2c8ee0c691"*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);