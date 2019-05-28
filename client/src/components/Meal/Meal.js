import React, { useState, useEffect } from "react";
import MealWrapper from "./MealWrapper";
import { months } from "../Home/Calender/Calander";
import { useLoaderState } from "../Utility/Hooks";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import Recipe from "../Recipe/Recipe";

export default function Meal(props) {
  const [plan, setPlan] = useState({ dow: [] });
  const Loaded = useLoaderState(
    getRequest,
    "/api/caldata/one/" + props.id,
    apiToken(),
    data => setPlan({ ...data.data })
  );

  return (
    <MealWrapper
      header="Meal"
      subheader={`for ${months[plan.dow[0]]} ${plan.dow[2]}, ${plan.dow[1]}`}
    >
      <div>
        {Loaded || (
          <>
            <h2 className="header-blue">Main Course</h2>
            <Recipe id={plan.mainId._id} />
            <h2 className="header-blue">Side</h2>
            {plan.sideOneId ? <Recipe id={plan.sideOneId._id} /> : null}
            {plan.sideOneSingleId ? (
              <div style={{ display: "block", position: "relative" }}>
                <div className="list-block" style={{ height: 100 }}>
                  <img
                    src={plan.sideOneSingleId.image}
                    alt={plan.sideOneSingleId.title}
                  />
                  <div>{plan.sideOneSingleId.title}</div>
                </div>
              </div>
            ) : null}
            <h2 className="header-blue">Side</h2>
            {plan.sideTwoId ? <Recipe id={plan.sideTwoId._id} /> : null}

            {plan.sideTwoSingleId ? (
              <div className="r-contain">
                <div
                  className="recipe"
                  style={{ display: "block", position: "relative" }}
                >
                  <div className="ingredients-block" style={{ height: 100 }}>
                    <img
                      src={plan.sideTwoSingleId.image}
                      alt={plan.sideTwoSingleId.title}
                    />
                    <h4>{plan.sideTwoSingleId.title}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <button>Delete</button>
    </MealWrapper>
  );
}
