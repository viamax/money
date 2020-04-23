export interface Transaction {
    name: string;
    value: number;
    type: "paycheck" | "income";
    subTransactions: Transaction[];
}

export enum SortType {
 ASC,
    DESC,

}