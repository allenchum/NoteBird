exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("firstName");
    table.string("lastName");
    table.string("gender");
    table.string("email");
    table.string("pwdHash");
    table.string("facebookID").unique();
    table.string("googleID").unique();
    table.string("profPicLink");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users");
};
