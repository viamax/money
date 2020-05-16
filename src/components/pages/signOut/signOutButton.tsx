import React from 'react';

import { withFirebase } from '../../Firebase';
import Button from "@material-ui/core/Button";

const SignOutButton = ({ firebase }) => (
    <Button color="inherit" onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);