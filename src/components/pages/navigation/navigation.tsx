import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SignOutButton from "../signOut/signOutButton";
import { SignUpFormPageProps } from "../signup/signUpPage";
import styled from "@material-ui/core/styles/styled";
import { AppBar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

//region [[ Styles ]]

const NavigationView = styled((props) => <div {...props} />)({
  flexGrow: 1,
    color:"blue"
});

const MenuArea = styled((props) => <div {...props} />)({
    display:"flex",
    alignItems: "center"
});

const MenuButton = styled(Button)({
  color:"white"
});

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface NavigationProps {
  authUser: any;
}

export interface NavigationAuthProps {
  email: any;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

const Navigation = ({ ...props }: NavigationProps) => {
  return (
    <NavigationView>
      <AppBar position="static" style={{backgroundColor:"lightblue"}}>
        <StyledToolbar>
            <MenuArea>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Money</Typography>
            </MenuArea>

            <div>
          {props.authUser ? (
            <NavigationAuth email={props.authUser.email} />
          ) : (
            <NavigationNonAuth />
          )}
            </div>
        </StyledToolbar>
      </AppBar>
    </NavigationView>
  );
};

const NavigationAuth = ({ ...props }: NavigationAuthProps) => {
  return (
    <>
      <span>Welcome {props.email}</span>
      <MenuButton color="inherit">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </MenuButton>

      <MenuButton>
        <Link color={"white"} to={ROUTES.HOME}>Home</Link>
      </MenuButton>

      <MenuButton>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </MenuButton>

        <SignOutButton />
    </>
  );
};

const NavigationNonAuth = () => (
  <>
    <Button color="inherit">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </Button>

    <Button color="inherit">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Button>
  </>
);

export default Navigation;
