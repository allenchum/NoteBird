
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("style_Height", "style_Width", "style_top", "style_left", "dragging");
    table.string("pt_style_Height");
    table.string("pt_style_Width");
    table.string("pt_style_Top");
    table.string("pt_style_Left");
    table.boolean("pt_dragging")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("points", (table) => {
    table.dropColumns("pt_style_Height", "pt_style_Width", "pt_style_Top", "pt_style_Left", 'pt_dragging')
    table.string("style_Height");
    table.string("style_Width");
    table.string("style_top");
    table.string("style_left");
    table.boolean("dragging")
  })
};
