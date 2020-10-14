import _ from "lodash";
import { Transaction } from "../model/transaction";
import React from "react";
import { moneyIcons } from "./Icons";

export class TransactionHelper {
  public static getType(transactionName: string) {
    if (
      transactionName === "מב. הפועלים-י" ||
      (transactionName && transactionName.indexOf("שיק") !== -1)
    ) {
      return "העברות";
    }

    if (
      transactionName === "הע. אינטרנט700" ||
      transactionName === "העברה עצמית700" ||
      (transactionName && transactionName.indexOf("הע. אינט") !== -1)
    ) {
      return "העברות";
    }

    if (
      (transactionName && transactionName.indexOf("מגדל") !== -1) ||
      (transactionName && transactionName.indexOf("מנורה") !== -1) ||
      (transactionName && transactionName.indexOf("פניקס") !== -1) ||
      (transactionName && transactionName.indexOf("מכבי") !== -1)
    ) {
      return "ביטוחים";
    }

    if (
      (transactionName && transactionName.indexOf("כספומט") !== -1) ||
      (transactionName && transactionName.indexOf("בנקט") !== -1)
    ) {
      return "כספומט";
    }

    if (transactionName === "פרעון הלוואה") {
      return "הלוואות";
    }

    if (
      transactionName === "לאומי ויזה י" ||
      transactionName === "ל.מסטרקארדי" ||
      (transactionName && transactionName.indexOf("לאומי קארד") !== -1) ||
      (transactionName && transactionName.indexOf("אמריקן אקספר") !== -1) ||
      (transactionName && transactionName.indexOf("כרטיסי אשראי") !== -1) ||
      (transactionName && transactionName.indexOf("דיינרס") !== -1) ||
      (transactionName && transactionName.indexOf("מקס איט") !== -1)
    ) {
      return "כרטיסי אשראי";
    }

    if (
      (transactionName && transactionName.indexOf("עמל.ערוץ") != -1) ||
      (transactionName && transactionName.indexOf("עמ.הקצאת אשראי") != -1) ||
      (transactionName && transactionName.indexOf("מסלול מורחב") != -1) ||
      transactionName === "מסלול בסיסי"
    ) {
      return "עמלות";
    }

    if (transactionName === "רבית זכות") {
      return "זיכויים";
    }

    if (transactionName && transactionName.indexOf("משכורת") != -1) {
      return "משכורת";
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

  public static getTransactionsByTimeframe(
    transactions: Transaction[],
    startMonth: number,
    timeframe: number
  ) {
    const filterTransactions =
      transactions.length > 0
        ? transactions.filter((t) => {
            console.log("t:" + t.date);
            return (
              t.date !== null &&
              (t.date as any).getMonth() > startMonth &&
              (t.date as any).getMonth() <= timeframe + startMonth
            );
          })
        : [];
    return filterTransactions;
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
