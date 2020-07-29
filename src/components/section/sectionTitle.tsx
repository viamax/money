import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { SortType, Transaction } from "../../model/transaction";
import {
  ExpandSection,
  LabelInput,
  ValueInput,
} from "../common/transactionRow";
import WorkIcon from "@material-ui/core/SvgIcon/SvgIcon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TransactionHelper } from "../../util/transactionHelper";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { MoneyUtil } from "../../util/MoneyUtil";

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
  marginBottom: "15px",
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
  expandable?: boolean;
  onExpand: () => void;
  expanded: boolean;
  categories: string[];
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
          color: "white",
        }}
        startAdornment={
          <IconButton style={{ opacity: 0 }}>
            <WorkIcon />
          </IconButton>
        }
        endAdornment={
          props.expandable !== false ? (
            <ExpandSection>
              {!props.expanded ? (
                <IconButton
                  disabled={props.categories.length === 0}
                  style={{
                    opacity: 1,
                  }}
                  onClick={() => {
                    props.onExpand();
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              ) : (
                <IconButton
                  disabled={props.categories.length === 0}
                  style={{
                    opacity: 1,
                  }}
                  onClick={() => {
                    props.onExpand();
                  }}
                >
                  <ExpandLessIcon />
                </IconButton>
              )}
            </ExpandSection>
          ) : (
            <span></span>
          )
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
          style: {
            textAlign: "right",
            width: "240px",
            fontFamily: "'Varela Round', sans-serif",
            fontSize: "20px",
            color: "white",
            fontWeight: 400,
          },
        }}
        labelWidth={0}
      />

      {props.months.map((month) => (
        <ValueInput
          dir="rtl"
          id="outlined-adornment-weight"
          value={MoneyUtil.numberWithCommas(
            !props.isBalance
              ? TransactionHelper.sumTransactions(
                  TransactionHelper.getTransactionOfMonth(
                    props.transactions,
                    month
                  )
                )
              : TransactionHelper.getMonthBalance(props.transactions, month)
          )}
          style={{
            backgroundColor: props.color,
            borderRadius: 0,
            borderLeft: "1px solid white",
            color: "white",
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

              fontFamily: "'Varela Round', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
            },
          }}
          labelWidth={0}
        />
      ))}
    </SectionTitleView>
  );
};
