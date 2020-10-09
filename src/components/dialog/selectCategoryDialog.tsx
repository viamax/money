import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import { CategorizeTransactionsTable } from "./categorizeTransactionsTable";
import { Transaction } from "../../model/transaction";
import transitions from "@material-ui/core/styles/transitions";

//region [[ Styles ]]

const SelectCategoryDialogView = styled("div")(({ theme }) => ({}));

//endregion [[ Styles ]]

//region [[ Props ]]

export interface SelectCategoryDialogProps {
  open: boolean;
  transactions: Transaction[];
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const SelectCategoryDialog = ({
  ...props
}: SelectCategoryDialogProps) => {
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    // Update the document title using the browser API
    setOpen(props.open);
  }, [props.open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SelectCategoryDialogView>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle dir={"rtl"}>{"מיון פעולות"}</DialogTitle>
        <DialogContent>
          <DialogContentText dir={"rtl"}>
            {"אלו פעולות שלא זוהו"}
          </DialogContentText>
          <CategorizeTransactionsTable transactions={props.transactions} />
        </DialogContent>
        <DialogActions dir={"rtl"}>
          <Button
            onClick={handleClose}
            color="primary"
            variant={"contained"}
            autoFocus
          >
            סיים
          </Button>
          <Button onClick={handleClose} color="primary">
            דלג
          </Button>
        </DialogActions>
      </Dialog>
    </SelectCategoryDialogView>
  );
};
