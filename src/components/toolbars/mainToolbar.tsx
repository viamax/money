import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

//region [[ Styles ]]

const MainToolbarView = styled((props) => <div {...props} />)({
  height: "80px",
  borderBottom: "1px solid #ebebeb",
  width: "100%",
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  alignItems: "center",
});

const AccountLogo = styled(Paper)({
  height: "60px",
  backgroundColor: "#CCE5FF",
  width: "60px",

  marginLeft: "10px",
});

const AccountNameContainer = styled("div")({});

const AccountName = styled("div")({
  fontWeight: 600,
  fontSize: "20px",
});

const RightSection = styled("div")({
  display: "flex",
  marginRight: "10px",
  flexDirection: "row-reverse",
});

const LeftSection = styled("div")({
  marginLeft: "10px",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface MainToolbarProps {}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const MainToolbar = ({ ...props }: MainToolbarProps) => {
  return (
    <MainToolbarView>
      <RightSection>
        <AccountLogo></AccountLogo>
        <AccountNameContainer>
          <AccountName>בנק לאומי</AccountName>
        </AccountNameContainer>
      </RightSection>

      <LeftSection>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={1}
          onChange={() => {}}
          label="Age"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={1}>חודש</MenuItem>
          <MenuItem value={2}>חודשיים</MenuItem>
          <MenuItem value={3}>שלושה חודשים</MenuItem>
          <MenuItem value={6}>חצי שנה</MenuItem>
          <MenuItem value={12}>שנה</MenuItem>
        </Select>
      </LeftSection>
    </MainToolbarView>
  );
};
