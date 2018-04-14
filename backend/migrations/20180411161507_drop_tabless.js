
exports.up = function(knex, Promise) {
  return knex.schema.dropTable("notes");
};

exports.down = function(knex, Promise) {

};
