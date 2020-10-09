import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Transaction } from "../../model/transaction";
import { useEffect } from "react";
import { TransactionHelper } from "../../util/transactionHelper";

//region [[ Styles ]]

const CategorizeTransactionsTableView = styled("div")(({ theme }) => ({}));

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 550,
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

//endregion [[ Styles ]]

//region [[ Props ]]

export interface CategorizeTransactionsTableProps {
  transactions: Transaction[];
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const CategorizeTransactionsTable = ({
  ...props
}: CategorizeTransactionsTableProps) => {
  const classes = useStyles();

  useEffect(() => {}, [props.transactions]);

  const otherTransactions = props.transactions.filter(
    (transaction) =>
      transaction.name !== undefined &&
      TransactionHelper.getType(transaction.name) === "אחר"
  );

  return (
    <CategorizeTransactionsTableView>
      <Paper className={classes.root}>
        <Table className={classes.table} dir={"rtl"}>
          <TableHead>
            <TableRow>
              <TableCell align="right" dir={"rtl"}>
                שם
              </TableCell>
              <TableCell align="right" dir={"rtl"}>
                ערך
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otherTransactions.map((transaction) => (
              <TableRow key={transaction.name}>
                <TableCell align="right">{transaction.name}</TableCell>
                <TableCell align="right">{transaction.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </CategorizeTransactionsTableView>
  );
};
