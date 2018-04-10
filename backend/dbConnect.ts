import * as Knex from 'knex'

const knex = Knex(require('./knexfile')[process.env.NODE_ENV || 'development']);

export { knex };
