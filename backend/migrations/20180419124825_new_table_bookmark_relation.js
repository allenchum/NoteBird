
exports.up = function(knex, Promise) {
  return knex.schema.createTable("bookmarkrelation", (table) => {
      table.increments();
      table.integer("bookmarkid").unsigned();
      table.foreign("bookmarkid").references('bookmark.id')
      table.integer("noteid").unsigned();
      table.foreign("noteid").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("bookmarkrelation");
};
