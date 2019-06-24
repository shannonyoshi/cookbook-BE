const router = require('express').Router();
const Recipes = require('./recipes-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  console.log(req.user);

  Recipes
    .getRecipes(req.user.id)
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({err})
    });
})

router.get('/:id', restricted, (req, res) => {
 const { id } = req.params;

  Recipes
    .getRecipeById(id)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err => {
      res.status(500).json({err})
    })
})

router.post('/', restricted, (req, res) => {
  const recipe = req.body;
  console.log(recipe);

  Recipes
    .addRecipe(recipe)
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({err})
    })
})

router.delete('/:id', restricted, (req, res) => {

  Recipes
    .deleteRecipe(req.params.id)
    .then(recipe => {
      res.status(200).json({message: `${recipe} deleted`})
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