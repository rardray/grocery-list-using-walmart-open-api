import React, { useEffect, useState } from "react";
import Loader from "./Loader";

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
