
exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", (table) => {
    table.increments();
    table.string("noteTag");
    table.integer("noteID").unsigned();
    table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tags");
};
