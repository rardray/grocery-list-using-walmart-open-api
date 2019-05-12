import cookie from "react-cookies";

export const searchURL = function(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?offset=0&number=10&query=${id}`;
};
export const apiKeyGr = function() {
  return { "X-RapidAPI-Key": cookie.load("grocery-api") };
};
export const editListUrl = "/api/list/edit";
export const postListUrl = "/api/list/post";
export const apiToken = function() {
  return { Authorization: cookie.load("token") };
};

export function findIndex(list, data) {
  for (let x = 0; x < list.length; x++) {
    if (list[x].id === data.id) {
      return x;
    }
  }
}

export function editData(data, ind, cb1, cb2) {
  const { history } = this.state;
  const id = data._id;
  let k = findIndex(history, data);
  if (k || k === 0) {
    cb1(data, [ind, k], history, id);
  } else {
    cb2(data, [ind, k]);
  }
}

export const SB_AD = "/grocery";
export const paths = [
  `${SB_AD}/addrecipe`,
  `${SB_AD}/cart`,
  "/",
  `${SB_AD}/favorites`,
  `${SB_AD}/history`
];

export const titles = ["new recipe", "cart", "home", "favorites", "history"];
