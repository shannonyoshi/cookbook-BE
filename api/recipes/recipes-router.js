const router = require('express').Router();
const Recipes = require('./recipes-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {

  Recipes
    .getRecipes()
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


module.exports = router;