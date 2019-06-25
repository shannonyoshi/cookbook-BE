
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {recipe_id: 1, name: 'step 1'},
        {recipe_id: 1, name: 'step 2'},
        {recipe_id: 1, name: 'step 3'}
      ]);
    });
};
