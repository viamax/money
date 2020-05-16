import React, {Component} from 'react';
import Firebase from "./firebase";

const FirebaseContext = React.createContext<any|null>(null);

export const withFirebase = Component => (props: any) => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;