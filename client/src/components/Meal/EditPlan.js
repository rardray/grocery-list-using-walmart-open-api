import React, { useEffect, useState } from "react";
import AddPlan from "./AddPlan";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";

export default function EditPlan(props) {
  const [plan, setPlan] = useState({
    mainId: [],
    sideOneId: [],
    sideTwoId: []
  });
  console.log(plan.mainId._id);
  useEffect(() => {
    getRequest(`/api/caldata/one/${props.id}`, apiToken(), data =>
      setPlan({ ...data.data })
    );
  }, []);
  return <AddPlan main={plan.mainId.title} {...props} />;
}
