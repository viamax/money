import * as React from "react";
import { withStyles } from "@material-ui/core"
import {Transaction} from "../../../model/transaction";
import {SectionComponent} from "../../section/sectionComponent";

//region [[ Styles ]]



//endregion [[ Styles ]]

//region [[ Props ]]

export interface CashflowProps {
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const Cashflow = ({ ...props }: CashflowProps) => {

    const transction1: Transaction = {
        name: "משכורת Kahun",
        type: "paycheck",
        value: 42000,
        subTransactions: [],
    };

    const transction2: Transaction = {
        name: "הכנסה בימוי",
        type: "paycheck",
        value: 10000,
        subTransactions: [],
    };

    const transction4: Transaction = {
        name: "תשלום אמא",
        type: "paycheck",
        value: 100,
        subTransactions: [],
    };

    const transction5: Transaction = {
        name: "החזר חבר",
        type: "paycheck",
        value: 500,
        subTransactions: [],
    };

    const transction3: Transaction = {
        name: "ביט",
        type: "paycheck",
        value: 600,
        subTransactions: [transction4, transction5],
    };



      return (
      <div className="App">
          <header className="App-header">
              <SectionComponent
                  title={"הכנסות"}
                  transactions={[transction1, transction2, transction3]}
              />

              <SectionComponent
                  title={"הוצאות"}
                  transactions={[transction1, transction2, transction3]}
              />

              <SectionComponent
                  title={"סך הכל"}
                  transactions={[transction1, transction2, transction3]}
              />
          </header>
      </div>
      );

}

