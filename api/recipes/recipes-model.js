
const db = require('../../data/dbConfig.js');

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  updateRecipe
};

async function getRecipes(userId) {
  // const recipes = await db('recipes').where({'recipes.user_id': userId});
  
  // const ingredients = await db('recipes')
  //   .join('ingredients', 'ingredients.recipe_id', 'recipes.id')
  //   .select('ingredients.name')
  //   .where({'ingredients.recipe_id': userId })
  //   .map(ingredient => {
  //     return ingredient.name
  //   });

  // const instructions = await db('instructions')
  //   .join('recipes', 'recipes.id', 'instructions.recipe_id')
  //   .select('instructions.name')
  //   .where({'instructions.recipe_id': userId })
  //   .map(instruction => {
  //     return instruction.name;
  //   });

  // const tags = await db('tags')
  //   .join('recipes', 'recipes.id', 'tags.recipe_id')
  //   .select('tags.tag')
  //   .where({'tags.recipe_id': userId });

  // const result = recipes.map(recipe => {
  //   return { ...recipe, ingredients, instructions, tags }
  // });

  // return result;

  return db('recipes')
    .where({'recipes.user_id': userId})
    // .join('ingredients', 'ingredients.recipe_id', 'recipes.id')
    // .join('instructions', 'instructions.recipe_id', 'recipes.id')
    // .join('tags', 'tags.recipe_id', 'recipes.id')
    // .select('recipes.*', 'ingredients.*', 'instructions.*', 'tags.*')
    // .where({'recipes.user_id': userId})
};

async function getRecipeById(id) {
  const recipe = await db('recipes')
  .where({id})
  .first();

  const ingredients = await db('ingredients')
    .join('recipes', 'recipes.id', 'ingredients.recipe_id')
    .select('ingredients.name')
    .where({'ingredients.recipe_id': id })
    .map(ingredient => {
      return ingredient.name;
    });

  const instructions = await db('instructions')
    .join('recipes', 'recipes.id', 'instructions.recipe_id')
    .select('instructions.name')
    .where({'instructions.recipe_id': id })
    .map(instruction => {
      return instruction.name;
    });

  const tags = await db('tags')
    .join('recipes', 'recipes.id', 'tags.recipe_id')
    .select('tags.tag')
    .where({'tags.recipe_id': id})
    .map(tag => {
      return tag.tag;
    });

  const result = { ...recipe, ingredients, instructions, tags }
  return result;
};

async function addRecipe(recipe, userId) {

  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;
  const tags = recipe.tags;

  const recipeInsert = { user_id: userId, title: recipe.title, source: recipe.source, notes: recipe.notes }
  
  const newRecipe = await db('recipes').insert(recipeInsert);
  console.log(newRecipe);

  ingredients.forEach(async ingredient => {
    ingredientInsert = {name: ingredient, recipe_id: newRecipe[0] }
    await db('ingredients').insert(ingredientInsert)
  });

  instructions.forEach(async instruction => {
    instructionInsert = {name: instruction, recipe_id: newRecipe[0] }
    await db('instructions').insert(instructionInsert)
  });

  tags.forEach(async tag => {
    tagInsert = {tag: tag, recipe_id: newRecipe[0] }
    await db('tags').insert(tagInsert)
  });

  return getRecipes(userId);
}

async function deleteRecipe(recipeId, userId) {
  await db('tags')
    .join('recipes', 'recipes.id', 'tags.recipe_id')
    .where({'tags.recipe_id': recipeId})
    .del();

  await db('instructions')
    .join('recipes', 'recipes.id', 'instructions.recipe_id')
    .where({'instructions.recipe_id': recipeId})
    .del();

  await db('ingredients')
    .join('recipes', 'recipes.id', 'ingredients.recipe_id')
    .where({'ingredients.recipe_id': recipeId})
    .del();
  
  await db('recipes')
    .where({'recipes.id': recipeId})
    .del();
  
  return getRecipes(userId);
}

function updateRecipe(id, changes) {

  console.log(changesUpdate)
  return db('recipes')
    .where({id})
    .update(changesUpdate)
}

