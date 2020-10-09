
import * as XLSX from 'xlsx';
import {Transaction, TransactionOld} from '../model/transaction';

export class ExcelUtil {
    static readFile(event: any, callback: Function ){

        let vm = this;

        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(event.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary',cellDates: true});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            vm.handleLeumiData(ws, callback);

            /* save data */
            //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        };


        reader.readAsBinaryString(target.files[0]);


    }

    static sheet2arr(sheet){
        let result: any = [];
        let row;
        let rowNum;
        let colNum;
        let range = XLSX.utils.decode_range(sheet['!ref']);
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
            row = [];
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
                let nextCell = sheet[
                    XLSX.utils.encode_cell({r: rowNum, c: colNum})
                    ];
                if( typeof nextCell === 'undefined' ){
                    row.push(void 0);
                } else {

                    if (nextCell != null && nextCell.v != null && nextCell.w == null) {
                        row.push(nextCell.v);
                    }
                    else {
                        row.push(nextCell.w);
                    }



                }
            }
            result.push(row);
        }
        return result;
    };


    static handleLeumiData(ws: XLSX.WorkSheet, callback) {

        let transactions = [];

        let data = this.sheet2arr(ws);

        if (data != null && data.length > 0) {

            for(let i = 22; i < data.length; i++) {


                const date = data[i][0] ? data[i][0].split("/") : null;

                const transactionDate = date ? new Date(parseInt("20"+date[2]), date[1]-1, date[0]) : null;



                const transactionName =  data[i][1];
                const transactionId = data[i][2];
                const transactionDebit = data[i][3] == undefined ? undefined : data[i][3].replace(',', '');
                const transactionCredit  = data[i][4] == undefined ? undefined : data[i][4].replace(',', '');
                const transactionBalance =  data[i][5];
                //newTransaction.AccountBalance = data[i][6].replace(',', '');
                (transactions as any).push({
                    name: transactionName,
                    date: transactionDate,
                    id: transactionId,
                    debit: transactionDebit,
                    credit: transactionCredit,
                    balance: transactionBalance,
                    value: transactionDebit | transactionCredit,
                    type: "paycheck",
                    subTransactions: []
                });
            }
        }

        callback(transactions);
    }

    handleHapoalimData(ws: XLSX.WorkSheet):Transaction[] {

        return [];
    }

}
