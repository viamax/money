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
import { TransactionRow } from "../common/transactionRow";

//region [[ Styles ]]

const TransactionView = styled(Paper)({
  display: "flex",

  flexDirection: "column",
});

const RowContainer = styled("div")({
  fontSize: "18px",
  fontWeight: 400,
  borderRadius: 0,
  borderTop: "1px solid white",
  fontFamily: "'Assistant', sans-serif",
  backgroundColor: "turquoise",
  display: "flex",
  flexDirection: "row-reverse",
  position: "relative",
});

const ExpandSection = styled("div")({
  top: "10px",
  right: "-45px",
  position: "absolute",
});

const ChildrenContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const ValueInput = styled(TransactionRow)({});

const LabelInput = styled(TransactionRow)({});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface TransactionProps {
  transaction: Transaction;
  total?: boolean;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const TransactionComponent = ({ ...props }: TransactionProps) => {
  const [transactionName, setTransactionName] = useState(
    props.transaction.name
  );
  const [transactionValue, setTransactionValue] = useState(
    props.transaction.value
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTransactionName(props.transaction.name);
    setTransactionValue(props.transaction.value);
  }, [props.transaction, props.total]);

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <TransactionView>
      <RowContainer>
        <ExpandSection>
          {!expanded ? (
            <IconButton
              disabled={props.transaction.subTransactions.length === 0}
              style={{
                opacity: props.transaction.subTransactions.length > 0 ? 1 : 0,
              }}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={props.transaction.subTransactions.length === 0}
              style={{
                opacity: props.transaction.subTransactions.length > 0 ? 1 : 0,
              }}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ExpandLessIcon />
            </IconButton>
          )}
        </ExpandSection>

        <LabelInput
          dir="rtl"
          id="outlined-adornment-weight"
          value={props.total ? "סה״כ" : transactionName}
          startAdornment={
            <IconButton style={{ opacity: props.total ? 0 : 1 }}>
              {props.transaction.type === "income" ? (
                <WorkIcon />
              ) : (
                <CreditCardIcon />
              )}
            </IconButton>
          }
          onFocus={handleFocus}
          style={{
            textAlign: "right",
            backgroundColor: props.total ? "aquamarine" : "#f3f3f3",
            borderRadius: 0,
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
        {!expanded && (
          <ValueInput
            dir="rtl"
            id="outlined-adornment-weight"
            onFocus={handleFocus}
            value={!expanded ? transactionValue : ""}
            style={{
              backgroundColor: props.total ? "aquamarine" : "lightgrey",
              borderRadius: 0,
            }}
            onChange={(event) => {
              setTransactionValue(parseFloat(event.target.value));
            }}
            startAdornment={
              <InputAdornment
                disableTypography={true}
                style={{
                  fontSize: "20px",
                  fontWeight: 400,
                  marginRight: "12px",
                  marginLeft: "0",
                  opacity: 0.5,
                }}
                position="end"
              >
                ₪
              </InputAdornment>
            }
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
      <ChildrenContainer>
        {expanded &&
          props.transaction.subTransactions.map((sub) => (
            <div>
              <TransactionComponent transaction={sub} />
            </div>
          ))}
      </ChildrenContainer>
    </TransactionView>
  );
};
