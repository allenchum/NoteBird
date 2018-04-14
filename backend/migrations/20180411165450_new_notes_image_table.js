// imageList sample output
// [ { coords: [ '50%', '50%' ],
//     dragging: false,
//     offs: [ 0, 0 ],
//     url: '/assets/img/AmumuSquare.png',
//     style:
//      { top: '50%',
//        left: '50%',
//        height: '330px',
//        width: '330px',
//        border: 'none' } } ]
exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes_Image", (table) => {
    table.increments();
    table.string("coords_0");
    table.string("coords_1");
    table.boolean("dragging");
    table.integer("offs_0");
    table.integer("offs_1");
    table.string("image_Url");
    table.string("style_top");
    table.string("style_left");
    table.string("style_height");
    table.string("style_width");
    table.string("style_border");
    table.integer("noteID").unsigned();
    table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("notes_Image");
};
