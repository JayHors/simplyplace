
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref, set, get, child, push, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export let isSignedIn = false;
export let userUid = "";
if(localStorage.getItem("jlh6319-SPsignedIn")){
    isSignedIn = localStorage.getItem("jlh6319-SPsignedIn");
    userUid = localStorage.getItem("jlh6319-SPUID");
}
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmoh7hDx-qLrmzhAbffiz7CtXAqWFeBZE",
    authDomain: "simplyplace-47a3f.firebaseapp.com",
    databaseURL: "https://simplyplace-47a3f-default-rtdb.firebaseio.com",
    projectId: "simplyplace-47a3f",
    storageBucket: "simplyplace-47a3f.appspot.com",
    messagingSenderId: "668136807894",
    appId: "1:668136807894:web:3d5e02e01e2e8a250c9877"
};
const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signIn() {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        userUid = user.uid;
        isSignedIn = true;
        localStorage.setItem("jlh6319-SPUID", userUid);
        localStorage.setItem("jlh6319-SPsignedIn", true);
    });
}
export function signOut() {
    localStorage.removeItem("jlh6319-SPUID");
    localStorage.removeItem("jlh6319-SPsignedIn");
}
export async function getFaves(){
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users/${userUid}`)).then((snapshot) => {
        if(snapshot.exists()){
            let faves = snapshot.val().faves;
            let rtnArr = [];
            for(let fave in faves){
                 rtnArr.push(faves[fave]);
            }
            return rtnArr;
        }
        else{
            return [];
        }
    }).catch((error) =>{console.error(error); return null});
}

export async function addFave(pid, place_type){
    const db = getDatabase();
    push(ref(db, `users/${userUid}/faves`), [pid, place_type]);
}
