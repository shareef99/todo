import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyA82eYZ-5wi1D6hJHrh5abgSxOKnGb5Gdw",
    authDomain: "todo-shareef.firebaseapp.com",
    projectId: "todo-shareef",
    storageBucket: "todo-shareef.appspot.com",
    messagingSenderId: "551313777231",
    appId: "1:551313777231:web:d16fa8c42f868dd9ae003a",
    measurementId: "G-PEQ0JGK8F3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
