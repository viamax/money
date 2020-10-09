import * as React from "react";
import { useEffect, useState } from "react";
import { Transaction } from "../../../model/transaction";
import Button from "@material-ui/core/Button";
import { ExcelUtil } from "../../../util/excelUtil";
import _ from "lodash";
import { TransactionHelper } from "../../../util/transactionHelper";
import { CashFlow } from "../../cashFlow/cashFlow";
import styled from "@material-ui/core/styles/styled";
import { SelectCategoryDialog } from "../../dialog/selectCategoryDialog";

//region [[ Styles ]]
const Timeline = styled((props) => <div {...props} />)({
  display: "flex",
  justifyContent: "center",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface CashflowProps {
  timeframe: number;
  startMonth: number;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const BankAccountTimeline = ({ ...props }: CashflowProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [monthTimeframe, setMonthsTimeframe] = useState<number[]>([]);

  const [selectCategoryDialogOpen, setSelectCategoryDialogOpen] = useState<
    boolean
  >(false);

  useEffect(() => {
    let months: number[] = [];
    for (
      let i = props.startMonth;
      i < props.timeframe + props.startMonth;
      i++
    ) {
      months.push(i + 1);
    }
    setMonthsTimeframe(months);
  }, [props.timeframe, props.startMonth]);

  const handleResult = (resp) => {
    const cats = _.uniq(
      resp.map((transaction) => TransactionHelper.getType(transaction.name))
    );

    setSelectCategoryDialogOpen(true);
    setCategories(cats);
    setTransactions(resp);
  };

  return (
    <div className="App">
      <input
        accept="*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(event) => {
          ExcelUtil.readFile(event, handleResult);
        }}
      />
      {transactions.length === 0 && (
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      )}

      <SelectCategoryDialog
        open={selectCategoryDialogOpen}
        transactions={transactions}
      />

      <Timeline>
        <CashFlow
          month={"מרץ"}
          months={monthTimeframe}
          categories={categories}
          transactions={transactions}
          showLabel={true}
        />
      </Timeline>
    </div>
  );
};
