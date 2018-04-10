exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_relation", (table) => {
    table.increments();
    table.integer("userID").unsigned();
    table.foreign("userID").references('users.id');
    table.integer("followingID").notNullable().unsigned();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_relation");
};
