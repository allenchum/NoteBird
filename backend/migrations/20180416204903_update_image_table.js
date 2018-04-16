
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("notesimage", (table) => {
    table.dropColumns("offs_0_", "offs_1_");
    table.float("offs_0");
    table.float("offs_1");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("notesimage", (table) => {
    table.dropColumns("offs_0", "offs_1");
    table.integer("offs_0_");
    table.integer("offs_1_");
  })
};
