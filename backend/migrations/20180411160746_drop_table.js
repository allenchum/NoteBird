
exports.up = function(knex, Promise) {
  return knex.schema.dropTable("points")
    .then(knex.schema.dropTable("images"))
    .then(knex.schema.dropTable("notes"));
};

exports.down = function(knex, Promise) {

};
