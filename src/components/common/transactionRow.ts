import styled from "@material-ui/core/styles/styled";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";


export const ExpandSection = styled("div")({
    /*top: "10px",
    right: "-45px",
    position: "absolute",*/
});

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

export const CommonInputProps = {
    "aria-label": "weight",
    style: {
    textAlign: "right",
        width: "240px",
        fontFamily: "'Varela Round', sans-serif",
        fontSize: "20px",
        fontWeight: 400,
    },
};

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
});


export const ValueInput = styled(TransactionRow)({});

export const LabelInput = styled(TransactionRow)({});