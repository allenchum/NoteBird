
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("notes", (table) => {
    table.dropColumns("title", "description");
    table.string("note_title");
    table.string("note_description");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("notes", (table) => {
    table.dropColumns("note_title", "note_description");
    table.string("title");
    table.string("description");
  })
};
