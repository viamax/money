import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@material-ui/core/styles/styled";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import WorkIcon from "@material-ui/icons/Work";
import { Transaction } from "../../model/transaction";
import {
  ExpandSection,
  LabelInput,
  RowContainer,
  ValueInput,
} from "../common/transactionRow";
import _ from "lodash";
import { TransactionComponent } from "./transactionComponent";
import { TransactionHelper } from "../../util/transactionHelper";
import { ShekelSymbol } from "../common/shekelSymbol";
import { MoneyUtil } from "../../util/MoneyUtil";

//region [[ Styles ]]

const TransactionCategoryView = styled(Paper)({
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

//endregion [[ Styles ]]

//region [[ Props ]]

export interface TransactionCategoryProps {
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

export const TransactionCategoryComponent = ({
  ...props
}: TransactionCategoryProps) => {
  const [expanded, setExpanded] = useState(true);
  const [total, setTotal] = useState(props.total ? props.total : 0);
  const [folderName, setFolderName] = useState("");

  const [uniqueTransactions, setUniqueTransactions] = useState<string[]>([]);

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

  return (
    <TransactionCategoryView>
      <RowContainer>
        {props.showLabel && (
          <LabelInput
            dir="rtl"
            id="outlined-adornment-weight"
            value={props.type}
            startAdornment={
              <IconButton style={{ opacity: total ? 0 : 1, minWidth: "40px" }}>
                {props.type === "income" ? <WorkIcon /> : <CreditCardIcon />}
              </IconButton>
            }
            onFocus={handleFocus}
            endAdornment={
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
            }
            style={{
              textAlign: "right",
              backgroundColor: props.color,
              borderRadius: 0,
              borderLeft: "1px solid white",
            }}
            onChange={(event) => {
              setFolderName(event.target.value);
            }}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              style: {
                textAlign: "right",
                width: "240px",
                fontFamily: "'Varela Round', sans-serif",
                fontSize: "20px",
                fontWeight: 400,
              },
            }}
            labelWidth={0}
          />
        )}
        {props.months.map((month) => (
          <ValueInput
            dir="rtl"
            id="outlined-adornment-weight"
            onFocus={handleFocus}
            readOnly
            value={MoneyUtil.numberWithCommas(
              TransactionHelper.sumTransactions(
                TransactionHelper.getTransactionOfMonth(
                  props.transactions,
                  month
                )
              )
            )}
            style={{
              backgroundColor: props.color,
              borderRadius: 0,
              fontWeight: 500,
              borderLeft: "1px solid white",
            }}
            startAdornment={
              <ShekelSymbol
                value={TransactionHelper.sumTransactions(
                  TransactionHelper.getTransactionOfMonth(
                    props.transactions,
                    month
                  )
                )}
              />
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              style: {
                textAlign: "right",

                fontFamily: "'Varela Round', sans-serif",
                fontSize: "20px",
                fontWeight: 400,
              },
            }}
            labelWidth={0}
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
                        <TransactionComponent
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

                      <TransactionComponent
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
    </TransactionCategoryView>
  );
};
