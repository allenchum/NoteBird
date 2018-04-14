
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("p1_0", "p1_1", "p2_0", "p2_1");
    table.float("p1_0_");
    table.float("p1_1_");
    table.float("p2_0_");
    table.float("p2_1_");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("p1_0_", "p1_1_", "p2_0_", "p2_1_")
    table.integer("p1_0");
    table.integer("p1_1");
    table.integer("p2_0");
    table.integer("p2_1");
  })
};
