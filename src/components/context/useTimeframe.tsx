import React, { useCallback, useState } from "react";
import { TimeframeContext } from "./timeframeContext";

export const useTimeframe = (): any => {
  const [startMonth, setStartMonth] = useState(0);
  const [timeframe, setTimeframe] = useState(6);

  const setCurrentStartMonth = useCallback(
    (currentStartMonth: number): void => {
      setStartMonth(currentStartMonth);
    },
    []
  );

  const setCurrentTimeframe = useCallback((currentTimeframe: number): void => {
    setTimeframe(currentTimeframe);
  }, []);

  return { startMonth, timeframe, setCurrentStartMonth, setCurrentTimeframe };
};
