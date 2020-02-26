// Update with your config settings.
rewuire("dotenv").config()
const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true, // needed for sqlite
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done)=> {
        conn.run("PRAGMA foreign_keys = ON", done)
      }, 
    },   
    migrations: {
      directory: path.normalize(path.join(__dirname, "/data/migrations"))
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'email',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migratons: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
