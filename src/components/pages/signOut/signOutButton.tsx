import React from "react";

import { withFirebase } from "../../Firebase";
import Button from "@material-ui/core/Button";
import * as ROUTES from "../../../constants/routes";

const SignOutButton = ({ firebase, history }) => {
  const signOut = (event) => {
    firebase.doSignOut(event);
    history.push(ROUTES.SIGN_IN);
  };

  return (
    <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
