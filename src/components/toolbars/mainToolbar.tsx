import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";

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

export interface MainToolbarProps {
  onChangeTimeframe: (value) => void;
  onChangeStartMonth: (value) => void;
  timeframe: number;
  startMonth: number;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const MainToolbar = ({ ...props }: MainToolbarProps) => {
  const [startMonth, setStartMonth] = useState(props.startMonth);
  const [timeframe, setTimeframe] = useState(props.timeframe);

  useEffect(() => {}, [startMonth, timeframe]);

  const onChangeTimeframe = (event) => {
    setTimeframe(event.target.value);
    props.onChangeTimeframe(event.target.value);
  };

  return (
    <MainToolbarView>
      <RightSection>
        <AccountLogo></AccountLogo>
        <AccountNameContainer>
          <AccountName>בנק לאומי</AccountName>
        </AccountNameContainer>
      </RightSection>

      <LeftSection>
        <IconButton>
          <ArrowBackIosIcon
            onClick={() => {
              if (props.startMonth + timeframe + 1 <= 12) {
                props.onChangeStartMonth(props.startMonth + 1);
              }
            }}
          />
        </IconButton>

        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={timeframe}
          onChange={onChangeTimeframe}
          label="Age"
        >
          <MenuItem aria-label="None" value="" />
          <MenuItem value={1}>חודש</MenuItem>
          <MenuItem value={2}>חודשיים</MenuItem>
          <MenuItem value={3}>שלושה חודשים</MenuItem>
          <MenuItem value={6}>חצי שנה</MenuItem>
          <MenuItem value={12}>שנה</MenuItem>
        </Select>
        <IconButton
          onClick={() => {
            if (props.startMonth - 1 >= 0) {
              props.onChangeStartMonth(props.startMonth - 1);
            }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </LeftSection>
    </MainToolbarView>
  );
};
