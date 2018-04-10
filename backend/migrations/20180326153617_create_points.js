exports.up = function(knex, Promise) {
  return knex.schema.createTable("points", (table) => {
    table.increments();
    table.integer("imageX1").notNullable();
    table.integer("imageY1").notNullable();
    table.integer("imageX2").notNullable();
    table.integer("imageY2").notNullable();
    table.string("pointTitle");
    table.string("pointContent");
    table.integer("noteID").unsigned();
    table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("points");
};
