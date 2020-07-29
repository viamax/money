import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import { SectionComponent } from "../section/sectionComponent";
import { Transaction } from "../../model/transaction";
import { monthNames, TitleWidth } from "../common/transactionRow";
import { IconButton } from "@material-ui/core";

//region [[ Styles ]]
const CashFlowView = styled((props) => <div {...props} />)({});

const MonthTitle = styled((props) => <div {...props} />)({
  color: "grey",

  textAlign: "center",
});

const MonthName = styled((props) => <div {...props} />)({
  color: "grey",
  fontSize: "14px",
  textAlign: "center",
});

const SingleMonthTitle = styled((props) => <div {...props} />)({
  display: "flex",
  justifyContent: "center",

  flexDirection: "column",
  width: TitleWidth + "px",
});

const MonthsContainers = styled((props) => <div {...props} />)({
  display: "flex",
  flexDirection: "row-reverse",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface MonthComponentProps {
  transactions: Transaction[];
  categories: string[];
  month: string;
  showLabel: boolean;
  months: number[];
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const CashFlow = ({ ...props }: MonthComponentProps) => {
  return (
    <CashFlowView>
      <header
        className="App-header"
        style={{ justifyContent: "start", alignItems: "end" }}
      >
        {props.transactions.length > 0 && (
          <>
            <MonthsContainers>
              {props.months.map((month) => (
                <SingleMonthTitle>
                  <MonthName>{monthNames[month - 1]}</MonthName>
                  <IconButton>
                    <MonthTitle>{month}</MonthTitle>
                  </IconButton>
                </SingleMonthTitle>
              ))}
            </MonthsContainers>

            <SectionComponent
              title={"הכנסות"}
              categories={props.categories}
              primaryColor={"turquoise"}
              secondaryColor={"aquamarine"}
              transactions={props.transactions.filter((t) => t.credit)}
              showLabel={props.showLabel}
              months={props.months}
            />
            <SectionComponent
              title={"הוצאות"}
              categories={props.categories}
              primaryColor={"#FF6666"}
              secondaryColor={"#FF9999"}
              transactions={props.transactions.filter((t) => t.debit)}
              showLabel={props.showLabel}
              months={props.months}
            />

            <SectionComponent
              title={"עובר ושב"}
              isBalance={true}
              categories={props.categories}
              primaryColor={"#3399FF"}
              secondaryColor={"#CCE5FF"}
              transactions={props.transactions.filter(
                (t) => t.debit || t.credit
              )}
              expandable={false}
              showLabel={props.showLabel}
              months={props.months}
            />
          </>
        )}
      </header>
    </CashFlowView>
  );
};
