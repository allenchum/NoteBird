exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("title");
    table.string("description");
    table.timestamps(false, true);
    table.string("status");
    table.integer("userID").unsigned();
    table.foreign("userID").references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};
