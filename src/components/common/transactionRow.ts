import styled from "@material-ui/core/styles/styled";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import {Title} from "@material-ui/icons";


export const ExpandSection = styled("div")({
    /*top: "10px",
    right: "-45px",
    position: "absolute",*/
});

export const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];

export const TitleWidth = 250;
export const TransactionWidth = 200;

export const RowContainer = styled("div")({
    fontSize: "18px",
    fontWeight: 400,
    borderRadius: 0,
    borderTop: "1px solid white",
    borderLeft: "1px solid white",
    fontFamily: "'Assistant', sans-serif",

    display: "flex",
    flexDirection: "row-reverse",
    position: "relative",
});



export const TransactionRow = styled(OutlinedInput)( {
    '&:hover':{
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "blue !important;",
            borderRadius: "0px",

        },

    },

    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "transparent !important;",
        borderRadius: "0px",
        '&:hover':{
            backgroundColor:"blue !important;",
        },
    },

    '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: "0px !important"
    },


    width: TitleWidth+"px"
});


export const ValueInput = styled(TransactionRow)({
    flex:1,

});

export const LabelInput = styled(TransactionRow)({});