
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: 'Taco', source: 'grandma' },
        {id: 2, user_id: 1, title: 'Salad', source: 'dad' },
        {id: 3, user_id: 1, title: 'Pizza', source: 'brother' }
      ]);
    });
};
