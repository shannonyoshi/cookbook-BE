const router = require('express').Router();
const Recipes = require('./recipes-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  console.log(req.user);
  const id = req.user.id

  Recipes
    .getRecipes(req.user.id)
    .then(recipes => {
      res.status(200).json({recipes, id});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({err})
    });
})

router.get('/:id', restricted, (req, res) => {
 const recipeId = req.params.id
 const userId = req.user.id

  Recipes
    .getRecipeById(recipeId, userId)
    .then(recipe => {
      res.status(200).json({recipe});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({err})
    })
})

router.post('/', restricted, (req, res) => {
  const recipe = req.body;
  const id = req.user.id
  // console.log(recipe);

  Recipes
    .addRecipe(recipe, id)
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      // s
      res.status(500).json({err})
    })
})

router.delete('/:id', restricted, (req, res) => {

  const recipeId = req.params.id;
  const userId = req.user.id;

  Recipes
    .deleteRecipe(recipeId, userId)
    .then(recipes => {
      res.status(200).json(recipes)
    })
    .catch( err => {
      res.status(500).json({message: 'Recipe not found.'})
    })
})

router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  Recipes
    .updateRecipe(id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


module.exports = router;