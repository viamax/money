import styled from "@material-ui/core/styles/styled";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";

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