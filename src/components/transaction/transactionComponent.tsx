import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@material-ui/core/styles/styled";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Transaction } from "../../model/transaction";
import { LabelInput, RowContainer, ValueInput } from "../common/transactionRow";
import { TransactionHelper } from "../../util/transactionHelper";
import { ShekelSymbol } from "../common/shekelSymbol";

//region [[ Styles ]]

const TransactionView = styled(Paper)({
  display: "flex",
  flexDirection: "column",
});

const ShekelAdornment = styled(InputAdornment)({
  display: "flex",
  flexDirection: "column",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface TransactionProps {
  transaction: Transaction;
  total?: boolean;
  showLabel: boolean;
  type: string;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const TransactionComponent = ({ ...props }: TransactionProps) => {
  const [transactionName, setTransactionName] = useState(
    props.transaction ? props.transaction.name : ""
  );
  const [transactionValue, setTransactionValue] = useState(
    props.transaction ? props.transaction.value : 0
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTransactionName(props.transaction ? props.transaction.name : "");
    setTransactionValue(props.transaction ? props.transaction.value : 0);
  }, [props.transaction, props.total]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const totalValue = 0;

  return (
    <TransactionView>
      <RowContainer>
        {props.showLabel && (
          <LabelInput
            dir="rtl"
            id="outlined-adornment-weight"
            value={props.total ? "סה״כ" : transactionName}
            startAdornment={
              <IconButton style={{ opacity: props.total ? 0 : 1 }}>
                <i
                  className={TransactionHelper.getIcon(props.type).iconName}
                ></i>
              </IconButton>
            }
            onFocus={handleFocus}
            style={{
              textAlign: "right",
              backgroundColor: props.total ? "aquamarine" : "#f3f3f3",
              borderRadius: 0,
              borderLeft: "1px solid white",
            }}
            onChange={(event) => {
              setTransactionName(event.target.value);
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
        {!expanded && (
          <ValueInput
            dir="rtl"
            id="outlined-adornment-weight"
            onFocus={handleFocus}
            value={
              !expanded
                ? transactionValue === 0
                  ? ""
                  : transactionValue
                : totalValue
            }
            style={{
              backgroundColor: props.total ? "aquamarine" : "lightgrey",
              borderRadius: 0,
            }}
            onChange={(event) => {
              setTransactionValue(parseFloat(event.target.value));
            }}
            startAdornment={<ShekelSymbol value={transactionValue} />}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              style: {
                textAlign: "right",
                width: "80px",
                fontFamily: "'Varela Round', sans-serif",
                fontSize: "20px",
                fontWeight: 400,
              },
            }}
            labelWidth={0}
          />
        )}
      </RowContainer>
    </TransactionView>
  );
};
