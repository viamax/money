import React, { Component, useState } from "react";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";
import styled from "@material-ui/core/styles/styled";
import { FirebaseContext } from "../../Firebase";
import { withFirebase } from "../../Firebase";
import { Link, withRouter } from "react-router-dom";

//region [[ Styles ]]

const SignInPageView = styled((props) => <div {...props} />)({});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface SignInPageProps {}

export interface SignInFormPageProps {
  firebase: any;
  history: any;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const SignInPage = ({ ...props }: SignInPageProps) => {
  return (
    <SignInPageView>
      <div>
        <h1>SignIn</h1>
        <FirebaseContext.Consumer>
          {(firebase) => <SignInForm firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    </SignInPageView>
  );
};

const SignInFormBase = ({ ...props }: SignInFormPageProps) => {
  const [email, setEmail] = useState("viamax@gmail.com");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState<any>(null);

  const isInvalid = password === "" || email === "";

  const onSubmit = (event) => {
    event.preventDefault();
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChangeEmail}
        type="text"
        placeholder="Email Address"
      />
      <br />
      <input
        name="password"
        value={password}
        onChange={onChangePassword}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error ? error.message : ""}</p>}
    </form>
  );
};

const SignInLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignInPage;

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export { SignInForm, SignInLink };
