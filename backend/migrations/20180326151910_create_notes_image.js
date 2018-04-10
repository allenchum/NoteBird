exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes_image", (table) => {
    table.increments();
    table.string("imagePath").notNullable();
    table.integer("imageX1");
    table.integer("imageY1");
    table.integer("noteID").unsigned();
    table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes_image");
};
