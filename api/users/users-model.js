const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

async function find() {
  return await db('users').select('id', 'email');
};

async function findBy(filter) {
  console.log("findBy filter", filter)
  return await db('users').where(filter);
};

async function add(user) {
  console.log("ADD   USER", user)
  // const id = await db('users').insert(user, ["id"]);
  await db('users').insert(user);
  // console.log("ID of new user", id)
  return findBy({"email": user.email});
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
};