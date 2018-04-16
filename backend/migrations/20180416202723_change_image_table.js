
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("notes_Image", (table) => {
    table.dropColumns("image_Url");
    table.string("imageurl");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("notes_Image", (table) => {
    table.dropColumns("imageurl")
    table.string("image_Url");
  })
};
