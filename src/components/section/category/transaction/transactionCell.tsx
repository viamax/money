import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Transaction } from "../../../../model/transaction";
import {
  LabelInput,
  RowContainer,
  ValueInput,
} from "../../../common/transactionRow";
import { TransactionHelper } from "../../../../util/transactionHelper";
import { ShekelSymbol } from "../../../common/shekelSymbol";
import { MoneyUtil } from "../../../../util/MoneyUtil";
import _ from "lodash";
import makeStyles from "@material-ui/core/styles/makeStyles";

//region [[ Styles ]]

const TransactionCellView = styled(Paper)(
  ({ isLabel }: { isLabel: boolean }) => ({
    display: "flex",
    flexDirection: "column",
    flex: isLabel ? "none" : 1,
  })
);

export const TransactionLabel = styled(LabelInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor: backgroundColor,
    textAlign: "right",
    borderRadius: 0,
    height: "45px",
  })
);

export const TransactionCellInput = styled(ValueInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor: backgroundColor,
    borderRadius: 0,
    height: "45px",
  })
);

const useStyles = makeStyles(() => ({
  input: {
    textAlign: "right",
    width: "240px",
    fontFamily: "'Varela Round', sans-serif",
    fontSize: "18px",
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

export interface TransactionCellProps {
  transactions: Transaction[];
  total?: boolean;
  showLabel: boolean;
  showValue: boolean;
  type: string;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const TransactionCell = ({ ...props }: TransactionCellProps) => {
  const classes = useStyles();

  const [transactionName, setTransactionName] = useState(
    props.transactions.length > 0 ? props.transactions[0].name : ""
  );
  const [transactionValue, setTransactionValue] = useState(
    props.transactions.length > 0
      ? _.sum(props.transactions.map((t) => t.value))
      : 0
  );
  const [expanded] = useState(false);

  useEffect(() => {
    setTransactionName(
      props.transactions.length > 0 ? props.transactions[0].name : ""
    );
    setTransactionValue(
      props.transactions.length > 0
        ? _.sum(props.transactions.map((t) => t.value))
        : 0
    );
  }, [props.transactions, props.total]);

  const handleFocus = (event) => {
    event.target.select();
  };

  const getTransactionIcon = () => {
    return (
      <IconButton style={{ opacity: props.total ? 0 : 0.5 }}>
        <i className={TransactionHelper.getIcon(props.type).iconName}></i>
      </IconButton>
    );
  };

  const getTransactionValue = () => {
    return !expanded
      ? transactionValue === 0
        ? ""
        : MoneyUtil.numberWithCommas(transactionValue)
      : totalValue;
  };

  const totalValue = 0;

  return (
    <TransactionCellView isLabel={props.showLabel}>
      <RowContainer>
        {props.showLabel && (
          <TransactionLabel
            dir="rtl"
            value={props.total ? "סה״כ" : transactionName}
            startAdornment={getTransactionIcon()}
            readOnly
            onFocus={handleFocus}
            backgroundColor={props.total ? "aquamarine" : "#f3f3f3"}
            onChange={(event) => {
              setTransactionName(event.target.value);
            }}
            inputProps={{ className: classes.input }}
          />
        )}
        {!expanded && props.showValue === true && (
          <TransactionCellInput
            dir="rtl"
            contentEditable={false}
            onFocus={handleFocus}
            readOnly
            value={getTransactionValue()}
            backgroundColor={props.total ? "aquamarine" : "#e7e7e7"}
            onChange={(event) => {
              setTransactionValue(parseFloat(event.target.value));
            }}
            startAdornment={<ShekelSymbol value={transactionValue} />}
            inputProps={{ className: classes.input2 }}
          />
        )}
      </RowContainer>
    </TransactionCellView>
  );
};
