import React, {Component, useState} from 'react';
import { compose } from 'recompose';
import * as ROUTES from '../../../constants/routes';
import styled from "@material-ui/core/styles/styled";
import { FirebaseContext } from '../../Firebase';
import { withFirebase } from '../../Firebase';
import { Link, withRouter } from 'react-router-dom';


//region [[ Styles ]]

const SignUpPageView = styled((props) => <div {...props} />)({

});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface SignUpPageProps {
}

export interface SignUpFormPageProps {
    firebase: any;
    history:any;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]


export const SignUpPage = ({ ...props }: SignUpPageProps) => {
    return <SignUpPageView>
        <div>
            <h1>SignUp</h1>
            <FirebaseContext.Consumer>
                {firebase => <SignUpForm firebase={firebase} />}
            </FirebaseContext.Consumer>
        </div>
    </SignUpPageView>;
}





const SignUpFormBase = ({ ...props }: SignUpFormPageProps) => {

    const [username, setUsername] = useState('max');
    const [email, setEmail] = useState('viamax@gmail.com');
    const [passwordOne, setPasswordOne] = useState('1234');
    const [passwordTwo, setPasswordTwo] = useState('1234');
    const [error, setError] = useState<any>(null);

    const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

    const onSubmit = event => {
        event.preventDefault();
        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                setUsername('');
                setEmail('');
                setPasswordOne('');
                setPasswordTwo('');
                //props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error );
            });



    }

    const onChangeUsername = event => {
        setUsername(event.target.value);
    };

    const onChangeEmail = event => {
        setEmail(event.target.value);
    };

    const onChangePasswordOne = event => {
        setPasswordOne(event.target.value);
    };

    const onChangePasswordTwo = event => {
        setPasswordTwo(event.target.value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChangeUsername}
                type="text"
                placeholder="Full Name"
            />
            <br/>
            <input
                name="email"
                value={email}
                onChange={onChangeEmail}
                type="text"
                placeholder="Email Address"
            />
            <br/>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChangePasswordOne}
                type="password"
                placeholder="Password"
            />
            <br/>
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChangePasswordTwo}
                type="password"
                placeholder="Confirm Password"
            />
            <br/>
            <button disabled={isInvalid} type="submit">
                Sign Up
            </button>

            {error &&
                <p>{error ? error.message : ""}</p>
            }
        </form>
    );

}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUpPage;


const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export { SignUpForm, SignUpLink };