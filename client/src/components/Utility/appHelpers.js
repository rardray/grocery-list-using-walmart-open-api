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