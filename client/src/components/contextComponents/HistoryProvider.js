import React, { useState } from "react";
import HistoryContext from "./history.context";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import cookie from "react-cookies";

const HistoryProvider = ({ children }) => {
  const getList = () => {
    let user = cookie.load("user");
    getRequest(
      "/api/list/" + user._id,
      apiToken(),
      data =>
        setHistory(prevHistory => {
          return { ...prevHistory, history: [...data.data] };
        }),
      () => {}
    );
  };
  const setHist = (data, i) => {
    setHistory(prevHistory => {
      let list = prevHistory.history;
      list[i] = data.data;
      return { ...prevHistory, history: [...list] };
    });
  };
  const addHistCount = data =>
    setHistory(prevHistory => {
      return { ...prevHistory, history: [...data] };
    });
  const clearHistory = () => {
    setHistory(() => histDef);
  };
  const histDef = {
    history: [],
    getList,
    setHist,
    addHistCount,
    clearHistory
  };
  const [history, setHistory] = useState(histDef);
  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
