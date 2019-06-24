
const db = require('../../data/dbConfig.js');

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe
  // removeRecipe,
  // updateRecipe
};

async function getRecipes() {
  const recipes = await db('recipes');
  console.log(recipes);
  
  await recipes.forEach(recipe => {
    recipe.ingredients = recipe.ingredients.split(', ')
  }) 

  const result = [ ...recipes ];
  console.log(result)
  return result;
};

async function getRecipeById(id) {
  const recipe = await db('recipes')
  .where({id})
  .first();

 const ingredients = recipe.ingredients.split(', ');

  const result = { ...recipe, ingredients}
  return result;
};

async function addRecipe(recipe) {
  const ingredients = recipe.ingredients.join(', ');

  console.log(ingredients);

  const recipeInsert = {...recipe, ingredients};
  console.log(recipeInsert)
  
  await db('recipes').insert(recipeInsert);

  return db.getAllRecipes();
}