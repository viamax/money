import _ from "lodash";
import { Transaction } from "../model/transaction";
import React from "react";
import { moneyIcons } from "./Icons";

export class TransactionHelper {
  public static getType(transactionName: string) {
    if (
      transactionName === "מב. הפועלים-י" ||
      transactionName === "   " ||
      transactionName === "   "
    ) {
      return "העברות";
    }

    if (
      transactionName === "הע. אינטרנט700" ||
      transactionName === "העברה עצמית700" ||
      transactionName === "   "
    ) {
      return "העברות";
    }

    if (
      (transactionName && transactionName.indexOf("כספומט") !== -1) ||
      (transactionName && transactionName.indexOf("בנקט") !== -1)
    ) {
      return "מזומן";
    }

    if (transactionName === "פרעון הלוואה") {
      return "הלוואות";
    }

    if (
      transactionName === "לאומי ויזה י" ||
      transactionName === "ל.מסטרקארדי" ||
      transactionName === "   "
    ) {
      return "כרטיסי אשראי";
    }

    if (
      (transactionName && transactionName.indexOf("עמל.ערוץ") != -1) ||
      transactionName === "מסלול בסיסי"
    ) {
      return "עמלות";
    }

    if (transactionName === "רבית זכות") {
      return "זיכויים";
    }

    return "אחר";
  }

  public static getTransactionOfMonth(
    transactions: Transaction[],
    month: number
  ) {
    return transactions.filter((t) => {
      return t.date!.getMonth() === month;
    });
  }

  public static getMonthBalance(transactions: Transaction[], month: number) {
    const transactionsOfMonth = TransactionHelper.getTransactionOfMonth(
      transactions,
      month
    );

    if (transactionsOfMonth.length > 0) {
      return transactionsOfMonth[transactionsOfMonth.length - 1].balance;
    } else {
      return null;
    }
  }

  public static sumTransactions(transactions: Transaction[]) {
    return _.sum(
      transactions.map((transaction) => {
        if (transaction.debit) {
          return parseInt(transaction.debit!);
        } else {
          return parseInt(transaction.credit!);
        }
      })
    );
  }

  public static getIcon(type: string): { iconName: string } {
    return moneyIcons[type];
  }
}
