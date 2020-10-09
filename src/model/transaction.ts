export interface Transaction {
    name: string;
    date?: Date;
    id?: string;
    debit?: string;
    credit?: string;
    balance?: string;
    value: number;
    type: "paycheck" | "income";
    subTransactions: Transaction[];
}

export class TransactionOld {
    constructor() {
        this.TransactionName ="";
        this.TransactionDate= "";
        this.AccountBalance = "";
        this.TransactionId = "";
        this.TransactionCredit = "";
        this.TransactionDebit = "";
    }
    public TransactionName : string;
    public TransactionDate : string;
    public TransactionId : string;
    public TransactionDebit : string;
    public TransactionCredit : string;
    public AccountBalance : string;
}

export enum SortType {
 ASC,
    DESC,
}