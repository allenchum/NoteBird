
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notesimage", (table) => {
    table.increments();
    table.string("coords_0");
    table.string("coords_1");
    table.boolean("dragging");
    table.integer("offs_0_");
    table.integer("offs_1_");
    table.string("imageurl");
    table.string("style_top");
    table.string("style_left");
    table.string("style_height");
    table.string("style_width");
    table.string("style_border");
    table.integer("noteID").unsigned();
    table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("notesimage");
};
