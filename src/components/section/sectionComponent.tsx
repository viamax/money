import * as React from "react";
import { useEffect, useState } from "react";
import { SectionTitle } from "./sectionTitle";
import { SortType, Transaction } from "../../model/transaction";
import styled from "@material-ui/core/styles/styled";
import _ from "lodash";
import { TransactionCategoryComponent } from "../transaction/transactionCategory";
import { TransactionHelper } from "../../util/transactionHelper";

//region [[ Styles ]]

const SectionComponentView = styled("div")({
  marginBottom: "20px",
  width: "100%",
  position: "relative",
});
//endregion [[ Styles ]]

//region [[ Props ]]

export interface SectionComponentProps {
  transactions: Transaction[];
  categories: string[];
  title: string;
  primaryColor: string;
  secondaryColor: string;
  showLabel: boolean;
  months: number[];
  expandable?: boolean;
  isBalance?: boolean;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const SectionComponent = ({ ...props }: SectionComponentProps) => {
  const [transactions, setTransactions] = useState(props.transactions);
  const [currentSort, setCurrentSort] = useState(SortType.DESC);
  const [total, setTotal] = useState(0);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTransactions(
      _.orderBy(
        props.transactions,
        ["value"],
        [currentSort === SortType.ASC ? "asc" : "desc"]
      ).slice()
    );

    setTotal(
      _.sum(
        props.transactions.map((transaction) => {
          if (transaction.debit) {
            return parseInt(transaction.debit!);
          } else {
            return parseInt(transaction.credit!);
          }
        })
      )
    );
  }, [currentSort, props.transactions, props.categories]);

  const setSortType = (sortType: SortType) => {
    setCurrentSort(sortType);
  };

  return (
    <SectionComponentView>
      <SectionTitle
        title={props.title}
        setSortType={setSortType}
        transactions={props.transactions}
        months={props.months}
        currentSort={currentSort}
        onExpand={() => {
          setExpanded(!expanded);
        }}
        expandable={props.expandable}
        total={total}
        categories={props.categories}
        expanded={expanded}
        isBalance={props.isBalance}
        color={props.primaryColor}
      />

      {expanded &&
        props.categories.map((category) => {
          const categoryTransactions = props.transactions.filter(
            (transaction) =>
              TransactionHelper.getType(transaction.name) === category
          );

          return categoryTransactions.length > 0 ? (
            <TransactionCategoryComponent
              months={props.months}
              transactions={categoryTransactions}
              color={props.secondaryColor}
              showLabel={props.showLabel}
              type={category}
            />
          ) : (
            <></>
          );
        })}
    </SectionComponentView>
  );
};
