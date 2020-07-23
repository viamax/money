import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import { SectionComponent } from "../section/sectionComponent";
import { Transaction } from "../../model/transaction";

//region [[ Styles ]]
const CashFlowView = styled((props) => <div {...props} />)({});

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
      <span style={{ color: "black" }}>{props.month}</span>
      <header className="App-header" style={{ justifyContent: "start" }}>
        {props.transactions.length > 0 && (
          <>
            {props.months.map((month) => (
              <span>{month}</span>
            ))}

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
              showLabel={props.showLabel}
              months={props.months}
            />
          </>
        )}
      </header>
    </CashFlowView>
  );
};
