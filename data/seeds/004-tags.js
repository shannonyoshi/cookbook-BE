
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {recipe_id: 1, tag: 'dinner'},
        {recipe_id: 2, tag: 'street food'},
        {recipe_id: 3, tag: 'mexican'}
      ]);
    });
};
