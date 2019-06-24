
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: 'Taco', source: 'grandma', ingredients: 'meat, tortilla, cheese', instructions: 'step 1 test, step 2 test2, step 3 step 3', category: 'dinner'}
        // {id: 2, user_id: 2, title: 'Salad', source: 'dad', ingredients: },
        // {id: 3, user_id: 3, title: 'Pizza', source: 'brother', ingredients: }
      ]);
    });
};
