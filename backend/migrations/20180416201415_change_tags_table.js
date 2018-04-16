
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("tags", (table) => {
    table.dropColumns("noteTag");
    table.string("notetags");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("tags", (table) => {
    table.dropColumns("notetags")
    table.string("noteTag");
  })
};
