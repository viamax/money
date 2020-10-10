import * as React from "react";
import { withStyles } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import InputAdornment from "@material-ui/core/InputAdornment";

//region [[ Styles ]]

const ShekelSymbolView = styled("div")({});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface ShekelSymbolProps {
  value: number;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const ShekelSymbol = ({ ...props }: ShekelSymbolProps) => {
  return (
    <ShekelSymbolView>
      <InputAdornment
        disableTypography={true}
        style={{
          fontSize: "20px",
          fontWeight: 400,
          minWidth: "20px",
          marginRight: "12px",
          marginLeft: "0",
          opacity: props.value === 0 || !props.value ? 0 : 0.5,
        }}
        position="end"
      >
        ₪
      </InputAdornment>
    </ShekelSymbolView>
  );
};
