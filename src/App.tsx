import React, {useEffect, useState} from "react";

import "./App.css";
import { Transaction } from "./model/transaction";
import { SectionComponent } from "./components/section/sectionComponent";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from "./components/pages/navigation/navigation";
import {SignInPage} from "./components/pages/signin/signInPage";

import * as ROUTES from './constants/routes';
import SignUpPage from "./components/pages/signup/signUpPage";

import { createBrowserHistory } from 'history';
import {withFirebase} from "./components/Firebase";


//region [[ Props ]]

export interface AppProps {
    firebase: any;
}

//endregion [[ Props ]]

export const App = ({ ...props }: AppProps) => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(authUserResp => {
            authUserResp
                ? setAuthUser(authUserResp)
                : setAuthUser(null)
        });
    });

  return(
      <Router history={createBrowserHistory()}>
      <div>
        <Navigation authUser={authUser}/>
        <hr />

        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          {/*<Route exact path={ROUTES.LANDING} component={LandingPage} />


          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />*/}


      </div>
      </Router>
  );
}

export default withFirebase(App);
