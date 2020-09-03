
import * as XLSX from 'xlsx';
import {Transaction, TransactionOld} from '../model/transaction';

export class MoneyUtil {
    static numberWithCommas(x) {

        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    }
}
