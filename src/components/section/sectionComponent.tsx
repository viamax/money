import * as React from "react";
import { useEffect, useState } from "react";
import { MonthTitle } from "../title/monthTitle";
import { TransactionComponent } from "../transaction/transactionComponent";
import { SortType, Transaction } from "../../model/transaction";
import styled from "@material-ui/core/styles/styled";
import _ from "lodash";

//region [[ Styles ]]

const SectionComponentView = styled("div")({
  marginBottom: "20px",
});
//endregion [[ Styles ]]

//region [[ Props ]]

export interface SectionComponentProps {
  transactions: Transaction[];
  title: string;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const SectionComponent = ({ ...props }: SectionComponentProps) => {
  const [transactions, setTransactions] = useState(props.transactions);
  const [currentSort, setCurrentSort] = useState(SortType.DESC);

  useEffect(() => {
    setTransactions(
      _.orderBy(
        props.transactions,
        ["value"],
        [currentSort === SortType.ASC ? "asc" : "desc"]
      ).slice()
    );
  }, [currentSort, props.transactions]);

  const setSortType = (sortType: SortType) => {
    setCurrentSort(sortType);
  };

  return (
    <SectionComponentView>
      <MonthTitle
        title={props.title}
        setSortType={setSortType}
        currentSort={currentSort}
      />

      {transactions.map((transaction) => (
        <TransactionComponent transaction={transaction} />
      ))}
      <TransactionComponent transaction={props.transactions[0]} total={true} />
    </SectionComponentView>
  );
};
