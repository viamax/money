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
import { TransactionHelper } from "../../util/transactionHelper";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { MoneyUtil } from "../../util/MoneyUtil";
import { ShekelSymbol } from "../common/shekelSymbol";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

export const SectionLabel = styled(LabelInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    textAlign: "right",
    borderRadius: 0,
    borderLeft: "1px solid white",
    color: "white",
    backgroundColor: backgroundColor,
  })
);

export const SectionSumValue = styled(ValueInput)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    borderRadius: 0,
    borderLeft: "1px solid white",
    color: "white",
    backgroundColor: backgroundColor,
  })
);

const useStyles = makeStyles(() => ({
  input: {
    textAlign: "right",
    fontFamily: "'Varela Round', sans-serif",
    fontSize: "20px",
    fontWeight: 600,
  },
}));

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

export const SectionSumUp = ({ ...props }: SectionTitleProps) => {
  const classes = useStyles();

  /*const sort = () => {
    if (props.currentSort === SortType.ASC) {
      props.setSortType(SortType.DESC);
    } else {
      props.setSortType(SortType.ASC);
    }
  };*/

  const getValue = (month) => {
    return MoneyUtil.numberWithCommas(
      !props.isBalance
        ? TransactionHelper.sumTransactions(
            TransactionHelper.getTransactionOfMonth(props.transactions, month)
          )
        : TransactionHelper.getMonthBalance(props.transactions, month)
    );
  };

  const getExpandIcon = () => {
    return props.expandable !== false ? (
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
    );
  };

  return (
    <SectionTitleView>
      <SectionLabel
        dir="rtl"
        value={props.title}
        backgroundColor={props.color}
        startAdornment={
          <IconButton style={{ opacity: 0 }}>
            <WorkIcon />
          </IconButton>
        }
        endAdornment={getExpandIcon()}
        inputProps={{ className: classes.input }}
      />

      {props.months.map((month) => (
        <SectionSumValue
          backgroundColor={props.color}
          dir="rtl"
          value={getValue(month)}
          startAdornment={<ShekelSymbol value={1} />}
          inputProps={{ className: classes.input }}
        />
      ))}
    </SectionTitleView>
  );
};
