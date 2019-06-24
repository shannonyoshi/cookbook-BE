
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: 'Taco', source: 'grandma', notes: 'good stuff' },
        {id: 2, user_id: 1, title: 'Salad', source: 'dad', notes: 'not very good' },
        {id: 3, user_id: 1, title: 'Pizza', source: 'brother', notes: 'great pizza' }
      ]);
    });
};
