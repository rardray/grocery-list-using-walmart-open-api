import React, { useState, useContext } from "react";
import MealWrapper from "./MealWrapper";
import { months } from "../Home/Calender/Calander";
import { useLoaderState } from "../Utility/Hooks";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import Recipe from "../Recipe/Recipe";
import { addToList, deleteCaldata } from "../Utility/listActions";
import SingleItem from "./SingleItem";
import HistoryContext from "../contextComponents/history.context";
import { navigate } from "@reach/router";
import Button from "../ThemedTags/Button";
import H2Blue from "../ThemedTags/H2Blue";
export default function Meal(props) {
  const [plan, setPlan] = useState({ dow: [] });
  const { getList } = useContext(HistoryContext);
  const Loaded = useLoaderState(
    getRequest,
    "/api/caldata/one/" + props.id,
    apiToken(),
    data => setPlan({ ...data.data })
  );

  function goTo(data, url) {
    if (data.status === 200) return navigate(url);
  }
  return (
    <MealWrapper
      header="Meal"
      subheader={`for ${months[plan.dow[0]]} ${plan.dow[2]}, ${plan.dow[1]}`}
    >
      <div>
        {Loaded || (
          <>
            <H2Blue label={"Main Course"} />
            <Recipe id={plan.mainId._id} user={props.user} />
            <H2Blue label={"Side"} />
            {plan.sideOneId ? (
              <Recipe id={plan.sideOneId._id} user={props.user} />
            ) : null}
            {plan.sideOneSingleId ? (
              <SingleItem
                add={() =>
                  addToList(
                    null,
                    { ...plan.sideOneSingleId, userId: props.user._id },
                    getList
                  )
                }
                image={plan.sideOneSingleId.image}
                title={plan.sideOneSingleId.title}
              />
            ) : null}
            <H2Blue label={"Side"} />
            {plan.sideTwoId ? (
              <Recipe id={plan.sideTwoId._id} user={props.user} />
            ) : null}

            {plan.sideTwoSingleId ? (
              <SingleItem
                add={() =>
                  addToList(
                    null,
                    { ...plan.sideTwoSingleId, userId: props.user._id },
                    getList
                  )
                }
                image={plan.sideTwoSingleId.image}
                title={plan.sideTwoSingleId.title}
              />
            ) : null}
          </>
        )}
      </div>
      <Button
        class={"button-blue-full"}
        click={() => deleteCaldata("/", plan, goTo)}
        label={"Delete"}
      />
    </MealWrapper>
  );
}
