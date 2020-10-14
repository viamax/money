import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import { BankAccountTimeline } from "../bankAccount/bankAccountTimeline";
import { MainToolbar } from "../../toolbars/mainToolbar";
import { useState } from "react";
import { useTimeframe } from "../../context/useTimeframe";
import { timeframeContext } from "../../context/timeframeContext";

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
  const timeframe = useTimeframe();

  return (
    <HomePageView>
      <timeframeContext.Provider value={timeframe}>
        <MainToolbar />

        <BankAccountTimeline />
      </timeframeContext.Provider>
    </HomePageView>
  );
};
