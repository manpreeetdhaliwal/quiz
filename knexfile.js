module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'quiz',
      username:'manpreet',
      password:"Mehreen1991"
    }, migrations: {
      tablename:'migrations',
      directory:'./db/migrations'
    },
    seeds:{
      directory:'./db/seeds'
    }
  },
};