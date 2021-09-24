import firebase from "firebase/app";
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyCBaAzd43cCCv8AOdiRw6FE7OQ696rZsVw",
  authDomain: "gapo-ca56b.firebaseapp.com",
  projectId: "gapo-ca56b",
  storageBucket: "gapo-ca56b.appspot.com",
  messagingSenderId: "190732512084",
  appId: "1:190732512084:web:0975d252a90a666744b6c1"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default  firebaseApp.firestore()