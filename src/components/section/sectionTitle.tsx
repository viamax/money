import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import { SortType, Transaction } from "../../model/transaction";
import { LabelInput, RowContainer, ValueInput } from "../common/transactionRow";
import WorkIcon from "@material-ui/core/SvgIcon/SvgIcon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TransactionHelper } from "../../util/transactionHelper";

//region [[ Styles ]]

const SectionTitleView = styled(Paper)({
  fontSize: "20px",
  fontWeight: 400,
  borderRadius: 0,
  borderTop: "1px solid white",
  height: "60px",
  alignItems: "center",
  display: "flex",
  position: "relative",
  flexDirection: "row-reverse",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface SectionTitleProps {
  title: string;
  currentSort: SortType;
  setSortType: (sort: SortType) => void;
  transactions: Transaction[];
  total: number;
  months: number[];
  color: string;
  isBalance?: boolean;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const SectionTitle = ({ ...props }: SectionTitleProps) => {
  const sort = () => {
    if (props.currentSort === SortType.ASC) {
      props.setSortType(SortType.DESC);
    } else {
      props.setSortType(SortType.ASC);
    }
  };

  return (
    <SectionTitleView>
      <LabelInput
        dir="rtl"
        id="outlined-adornment-weight"
        value={props.title}
        style={{
          textAlign: "right",
          backgroundColor: props.color,
          borderRadius: 0,
          borderLeft: "1px solid white",
        }}
        startAdornment={
          <IconButton style={{ opacity: 0 }}>
            <WorkIcon />
          </IconButton>
        }
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

      {props.months.map((month) => (
        <ValueInput
          dir="rtl"
          id="outlined-adornment-weight"
          value={
            !props.isBalance
              ? TransactionHelper.sumTransactions(
                  TransactionHelper.getTransactionOfMonth(
                    props.transactions,
                    month
                  )
                )
              : TransactionHelper.getMonthBalance(props.transactions, month)
          }
          style={{
            backgroundColor: props.color,
            borderRadius: 0,
            borderLeft: "1px solid white",
          }}
          startAdornment={
            <InputAdornment
              disableTypography={true}
              style={{
                fontSize: "20px",
                fontWeight: 400,
                minWidth: "20px",
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
              fontWeight: 500,
            },
          }}
          labelWidth={0}
        />
      ))}
    </SectionTitleView>
  );
};
