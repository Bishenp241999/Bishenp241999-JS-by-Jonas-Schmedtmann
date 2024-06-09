import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
    rec: {},
    search:{
        query:'',
        results:[]
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)
        const { rec } = data.data;
        state.rec = {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            sourceUrl: rec.source_url,
            image: rec.image_url,
            servings: rec.servings,
            cookingTime: rec.cooking_time,
            ingredients: rec.ingredients
        }
        console.log(state.rec);
    } catch (error) {
        // alert(error);
        throw error;
    }

}

export const loadSearchResults = async function(query){
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results =data.data.recipes.map(rec=> {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        // console.log(state.search.results);
        
    } catch (error) {
        throw error;
    }
}

