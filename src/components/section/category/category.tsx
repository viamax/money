import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import WorkIcon from "@material-ui/icons/Work";

import {
  ExpandSection,
  LabelInput,
  RowContainer,
  ValueInput,
} from "../../common/transactionRow";
import _ from "lodash";
import { TransactionCell } from "./transaction/transactionCell";
import { TransactionHelper } from "../../../util/transactionHelper";
import { ShekelSymbol } from "../../common/shekelSymbol";
import { MoneyUtil } from "../../../util/MoneyUtil";
import { Transaction } from "../../../model/transaction";
import makeStyles from "@material-ui/core/styles/makeStyles";

//region [[ Styles ]]

const CategoryView = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
});

const ChildrenContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const TransactionRow = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
});

export const CategoryLabel = styled(LabelInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor: backgroundColor,
    textAlign: "right",

    borderRadius: 0,
    borderLeft: "1px solid white",
  })
);

export const CategoryCell = styled(ValueInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor: backgroundColor,
    borderRadius: 0,
    fontWeight: 500,
    borderLeft: "1px solid white",
  })
);

const useStyles = makeStyles(() => ({
  input: {
    textAlign: "right",
    width: "240px",
    fontFamily: "'Varela Round', sans-serif",
    fontSize: "20px",
    fontWeight: 400,
  },
  input2: {
    textAlign: "right",
    fontFamily: "'Varela Round', sans-serif",
    fontSize: "20px",
    fontWeight: 400,
  },
}));

//endregion [[ Styles ]]

//region [[ Props ]]

export interface CategoryProps {
  transactions: Transaction[];
  type: string;
  color: string;
  showLabel: boolean;
  months: number[];
  total?: number;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const Category = ({ ...props }: CategoryProps) => {
  const [expanded, setExpanded] = useState(true);
  const [total, setTotal] = useState(props.total ? props.total : 0);

  const [uniqueTransactions, setUniqueTransactions] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (!props.total) {
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
    }

    setUniqueTransactions(_.uniq(props.transactions.map((t) => t.name)));
  }, [props.transactions, props.type]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const getCategorySum = (month) => {
    return MoneyUtil.numberWithCommas(
      TransactionHelper.sumTransactions(
        TransactionHelper.getTransactionOfMonth(props.transactions, month)
      )
    );
  };

  const getCategoryIcon = () => {
    return (
      <IconButton style={{ opacity: total ? 0 : 1, minWidth: "40px" }}>
        {props.type === "income" ? <WorkIcon /> : <CreditCardIcon />}
      </IconButton>
    );
  };

  const getExpandIcon = () => {
    return (
      <ExpandSection>
        {!expanded ? (
          <IconButton
            disabled={props.transactions.length === 0}
            style={{
              opacity: props.transactions.length > 0 ? 1 : 0,
            }}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : (
          <IconButton
            disabled={props.transactions.length === 0}
            style={{
              opacity: props.transactions.length > 0 ? 1 : 0,
            }}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        )}
      </ExpandSection>
    );
  };

  return (
    <CategoryView>
      <RowContainer>
        {props.showLabel && (
          <CategoryLabel
            dir="rtl"
            value={props.type}
            startAdornment={getCategoryIcon()}
            onFocus={handleFocus}
            endAdornment={getExpandIcon()}
            backgroundColor={props.color}
            inputProps={{ className: classes.input }}
          />
        )}
        {props.months.map((month) => (
          <CategoryCell
            dir="rtl"
            onFocus={handleFocus}
            readOnly
            value={getCategorySum(month)}
            backgroundColor={props.color}
            startAdornment={<ShekelSymbol value={getCategorySum(month)} />}
            inputProps={{ className: classes.input2 }}
          />
        ))}
      </RowContainer>
      <ChildrenContainer>
        {expanded &&
          uniqueTransactions.map((name) => {
            const unique = props.transactions.filter((t) => t.name === name);

            return (
              <TransactionRow>
                {props.months.map((month, index) => {
                  const uniquePerMonth = unique.filter(
                    (t) => (t.date as any).getMonth() === month
                  );

                  return (
                    <>
                      {index === 0 && (
                        <TransactionCell
                          type={props.type}
                          transactions={
                            uniquePerMonth.length > 0
                              ? uniquePerMonth
                              : [
                                  {
                                    name: name,
                                    value: 0,
                                    type: "income",
                                    subTransactions: [],
                                  },
                                ]
                          }
                          showLabel={true}
                          showValue={false}
                        />
                      )}

                      <TransactionCell
                        type={props.type}
                        transactions={
                          uniquePerMonth.length > 0
                            ? uniquePerMonth
                            : [
                                {
                                  name: name,
                                  value: 0,
                                  type: "income",
                                  subTransactions: [],
                                },
                              ]
                        }
                        showLabel={false}
                        showValue={true}
                      />
                    </>
                  );
                })}
              </TransactionRow>
            );
          })}
      </ChildrenContainer>
    </CategoryView>
  );
};
