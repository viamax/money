import app from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDzcylgM2E7bcI910x1Hu09aIWFvvIq0kU",
    authDomain: "moneyxxx.firebaseapp.com",
    databaseURL: "https://moneyxxx.firebaseio.com",
    projectId: "moneyxxx",
    storageBucket: "moneyxxx.appspot.com",
    messagingSenderId: "701739152964",
    appId: "1:701739152964:web:2f0bd6a5d542d85c1fee11",
    measurementId: "G-R28P30NQSN"
}


/*const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};*/

class Firebase {
    private auth;
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


}

export default Firebase;