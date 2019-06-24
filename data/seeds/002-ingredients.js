
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {recipe_id: 1, name: 'meat'},
        {recipe_id: 1, name: 'tortilla'},
        {recipe_id: 1, name: 'beans'}
      ]);
    });
};
