import { createContext } from "react";

const HistoryContext = createContext({
  history: [],
  getList: () => {},
  setHist: () => {},
  addHistCount: () => {},
  clearHistory: () => {}
});

export default HistoryContext;
