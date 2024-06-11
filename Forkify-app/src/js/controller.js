import * as model from './model.js';
import recipeView from './views/recipeView.js';
// below polyfills other code 
import 'core-js/stable';
// below polyfills asynce-await
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // guard clause if we have no id
    if (!id) return;
    recipeView.renderSpinner();
    // 1.Loading recipe from API
    // console.log("before request");
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error);
    recipeView.renderError();
    // console.log(error);
  }
}


const controlSearchResults = async function () {
  try {
   resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    // console.log(query);
    if (!query) return;
    

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1))
  } catch (error) {
    console.log(error);
  }
}

// alternative for line 146 & 147
// window.addEventListener('hashchange', controllRecipes);
// window.addEventListener('load',controllRecipes)

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
