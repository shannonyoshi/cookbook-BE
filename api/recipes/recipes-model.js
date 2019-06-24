
const db = require('../../data/dbConfig.js');

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  updateRecipe
};

async function getRecipes(userId) {
  const recipes = await db('recipes').where({'recipes.user_id': userId});
  
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
    })

  const result = { ...recipe, ingredients, instructions, tags }
  return result;
};

async function addRecipe(recipe, userId) {

  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;

  console.log(ingredients)

  await ingredients.forEach(async ingredient => {
    console.log(ingredient);
    ingredientInsert = {name: ingredient, recipe_id: userId}
    await db('ingredients').insert(ingredientInsert)
  });

  await instructions.forEach(async instruction => {
    console.log(ingredient);
    instructionInsert = {name: instruction, recipe_id: userId}
    await db('instructions').insert(instructionInsert);
  });

  const tags = {...recipe.tags, recipe_id: userId}

  const recipeInsert = { user_id: userId, title: recipe.title, source: recipe.source, notes: recipe.notes }
  
  await db('recipes').insert(recipeInsert);

  // await db('ingredients').insert(ingredients)

  // await db('instructions').insert(instructions)

  // await db('tags').insert(tags)

  return getRecipes(userId);
}

function deleteRecipe(id) {
  return db('recipes')
    .where({id})
    .del()
}

function updateRecipe(id, changes) {
  const ingredients = changes.ingredients.join(', ');

  const changesUpdate = {...changes, ingredients};

  console.log(changesUpdate)
  return db('recipes')
    .where({id})
    .update(changesUpdate)
}