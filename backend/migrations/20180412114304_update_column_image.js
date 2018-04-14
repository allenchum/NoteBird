
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("notes_Image", (table) => {
    table.dropColumns("offs_0", "offs_1");
    table.float("offs_0_");
    table.float("offs_1_");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("notes_Image", (table) => {
    table.dropColumns("offs_0_", "offs_1_")
    table.integer("offs_0");
    table.integer("offs_1");
  })
};
