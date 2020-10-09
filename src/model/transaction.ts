export interface Transaction {
    name: string;
    date?: Date;
    id?: string;
    debit?: string;
    credit?: string;
    balance?: string;
    value: number;
    type: string;
    subTransactions: Transaction[];
}

export enum SortType {
 ASC,
    DESC,
}