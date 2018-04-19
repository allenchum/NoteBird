
exports.up = function(knex, Promise) {
  return knex.schema.createTable("bookmark", (table) => {
      table.increments();
      table.string("bookmarkname");
      table.integer("userID").unsigned();
      table.foreign("userID").references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("bookmark");
};
