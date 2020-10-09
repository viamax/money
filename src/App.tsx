import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/pages/navigation/navigation";
import { SignInPage } from "./components/pages/signin/signInPage";
import * as ROUTES from "./constants/routes";
import SignUpPage from "./components/pages/signup/signUpPage";
import { createBrowserHistory } from "history";
import { withAuthentication } from "./components/Session";
import { HomePage } from "./components/pages/homePage/homePage";

//region [[ Props ]]

export interface AppProps {}

//endregion [[ Props ]]

const historyGlobal = createBrowserHistory({ forceRefresh: true });

export const App = ({ ...props }: AppProps) => {
  return (
    <>
      <Router history={historyGlobal}>
        <div>
          <Navigation history={historyGlobal} />

          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={"/"} component={HomePage} />

          {/*


          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />*/}
        </div>
      </Router>
    </>
  );
};

export default withAuthentication(App);
