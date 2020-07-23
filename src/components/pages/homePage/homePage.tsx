import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import { BankAccountTimeline } from "../bankAccount/bankAccountTimeline";

//region [[ Styles ]]

const HomePageView = styled((props) => <div {...props} />)({});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface HomePageProps {}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const HomePage = ({ ...props }: HomePageProps) => {
  return (
    <HomePageView>
      <BankAccountTimeline />
    </HomePageView>
  );
};
