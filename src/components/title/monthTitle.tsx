import * as React from "react";
import styled from "@material-ui/core/styles/styled";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import { SortType } from "../../model/transaction";

//region [[ Styles ]]

const MonthTitleView = styled(Paper)({
  fontSize: "20px",
  fontWeight: 400,
  borderRadius: 0,
  borderTop: "1px solid white",
  height: "60px",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "turquoise",
  display: "flex",
  flexDirection: "row-reverse",
});

const SectionTitle = styled("div")({
  marginRight: "20px",
});

//endregion [[ Styles ]]

//region [[ Props ]]

export interface MonthTitleProps {
  title: string;
  currentSort: SortType;
  setSortType: (sort: SortType) => void;
}

//endregion [[ Props ]]

//region [[ Functions ]]
//endregion [[ Functions ]]

export const MonthTitle = ({ ...props }: MonthTitleProps) => {
  const sort = () => {
    if (props.currentSort === SortType.ASC) {
      props.setSortType(SortType.DESC);
    } else {
      props.setSortType(SortType.ASC);
    }
  };

  return (
    <MonthTitleView>
      <SectionTitle>{props.title}</SectionTitle>

      <IconButton onClick={sort}>
        <ArrowUpwardIcon />
      </IconButton>
    </MonthTitleView>
  );
};
