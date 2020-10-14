import * as React from "react";
import { useEffect } from "react";
import styled from "@material-ui/core/styles/styled";
import { Section } from "../section/section";
import { Transaction } from "../../model/transaction";
import { monthNames, TitleWidth } from "../common/transactionRow";
import { IconButton } from "@material-ui/core";

//region [[ Styles ]]
const CashFlowView = styled((props) => <div {...props} />)({
  width: "100%",
});

const MonthTitle = styled((props) => <div {...props} />)({
  color: "grey",
  fontFamily: "'Varela Round', sans-serif",
  textAlign: "center",
  fontWeight: 500,
  fontSize: "22px",
});

const MonthName = styled((props) => <div {...props} />)({
  color: "grey",
  fontSize: "14px",
  fontFamily: "'Varela Round', sans-serif",
  textAlign: "center",
});

const SingleMonthTitle = styled((props) => <div {...props} />)({
  display: "flex",
  justifyContent: "center",
  flex: 1,
  fontFamily: "'Varela Round', sans-serif",
  flexDirection: "column",
  width: TitleWidth + "px",
});

const MonthsContainers = styled((props) => <div {...props} />)({
  display: "flex",
  width: "100%",
  marginTop: "15px",
  marginRight: TitleWidth + "px",
  justifyContent: "flex-end",
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
  useEffect(() => {}, [props.months]);

  return (
    <CashFlowView>
      <header
        className="App-header"
        style={{ justifyContent: "start", alignItems: "end" }}
      >
        {props.transactions.length > 0 && (
          <>
            <MonthsContainers>
              <SingleMonthTitle
                style={{ width: TitleWidth + "px", flex: "none" }}
              />

              {props.months.map((month) => (
                <SingleMonthTitle>
                  <MonthName>{month}</MonthName>
                  <IconButton>
                    <MonthTitle>{monthNames[month - 1]}</MonthTitle>
                  </IconButton>
                </SingleMonthTitle>
              ))}
            </MonthsContainers>

            <Section
              title={"הכנסות"}
              categories={props.categories}
              primaryColor={"#3a7ab9"}
              secondaryColor={"#b1c9f2"}
              transactions={props.transactions.filter((t) => t.credit)}
              showLabel={props.showLabel}
              months={props.months}
            />
            <Section
              title={"הוצאות"}
              categories={props.categories}
              primaryColor={"#FF6666"}
              secondaryColor={"#ecc2bd"}
              transactions={props.transactions.filter((t) => t.debit)}
              showLabel={props.showLabel}
              months={props.months}
            />

            <Section
              title={"יתרה סוף חודש"}
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
