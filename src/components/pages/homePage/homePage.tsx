import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import { BankAccountTimeline } from "../bankAccount/bankAccountTimeline";
import { MainToolbar } from "../../toolbars/mainToolbar";
import { useState } from "react";

//region [[ Styles ]]

const HomePageView = styled((props) => <div {...props} />)({
  width: "100%",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface HomePageProps {}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const HomePage = ({ ...props }: HomePageProps) => {
  const [timeframe, setTimeframe] = useState(3);
  const [startMonth, setStartMonth] = useState(0);

  return (
    <HomePageView>
      <MainToolbar
        onChangeTimeframe={(value) => {
          setTimeframe(value);
        }}
        onChangeStartMonth={(value) => {
          setStartMonth(value);
        }}
        startMonth={startMonth}
        timeframe={timeframe}
      />

      <BankAccountTimeline timeframe={timeframe} startMonth={startMonth} />
    </HomePageView>
  );
};
