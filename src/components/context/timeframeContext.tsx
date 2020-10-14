import * as React from "react";

export interface TimeframeContext {
  startMonth: number;
  timeframe: number;
  setCurrentTimeframe: (timeframe: number) => void;
  setCurrentStartMonth: (startMonth: number) => void;
}

const TIMEFRAME_DEFAULT_VALUE = {
  startMonth: 0,
  timeframe: 6,
  setCurrentTimeframe: () => {},
  setCurrentStartMonth: () => {},
};

export const timeframeContext = React.createContext<TimeframeContext>(
  TIMEFRAME_DEFAULT_VALUE
);
