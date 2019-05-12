import { createContext } from "react";

const HistoryContext = createContext({
  history: [],
  getList: () => {},
  setHist: () => {},
  addHistCount: () => {}
});

export default HistoryContext;
