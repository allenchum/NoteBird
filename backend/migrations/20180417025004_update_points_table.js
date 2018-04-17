
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("style_backgroud_Color", "style_textboxUpright", "style_textPosition");
    table.string("style_background_color");
    table.string("style_textboxupright_transform");
    table.string("style_textboxposition_top")
    table.string("style_textboxposition_left")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("style_background_color", "style_textboxupright_transform", "style_textboxposition_top", "style_textboxposition_left");
    table.string("style_backgroud_Color");
    table.string("style_textboxUpright");
    table.string("style_textPosition")
  })
};
