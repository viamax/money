import React from "react";

import "./App.css";
import { Transaction } from "./model/transaction";
import { SectionComponent } from "./components/section/sectionComponent";

function App() {
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

export default App;
