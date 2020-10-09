


export class MoneyUtil {
    static numberWithCommas(x) {

        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    }
}
