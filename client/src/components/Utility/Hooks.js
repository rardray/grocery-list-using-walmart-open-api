import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getRequest } from "./httpRequests";
import { apiToken } from "./appHelpers";

export function useLoaderState(req, arg1, arg2, arg3) {
  const [loaded, setLoad] = useState(<Loader />);

  useEffect(() => {
    function loading() {
      req(arg1, arg2, arg3, () => setLoad(null));
    }
    loading();
  }, []);
  return loaded;
}

export function useGetLists(url, change) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getRequest(url, apiToken(), data => setList(data.data));
  }, [change]);
  return list;
}
