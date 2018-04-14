// [ { p1: [ 561, 343 ],
//     dragging: false,
//     title: 'Title',
//     content: 'Content',
//     p2: [ 697, 252 ],
//     length: 163.63679292872982,
//     angle: 236.21282107631185,
//     style:
//      { height: '163.63679292872982px',
//        width: '3px',
//        'background-color': 'red',
//        position: 'absolute',
//        top: '249.83999999999997px',
//        left: '410.19px',
//        transform: 'rotate(236.21282107631185deg)',
//        'transform-origin': '0% 0%' },
//     textboxUpright: { transform: 'rotate(-236.21282107631185deg)' },
//     textboxPosition: { top: '-45px', left: '25px' } } ]

exports.up = function(knex, Promise) {
  return knex.schema.createTable("points", (table) => {
      table.increments();
      table.integer("p1_0");
      table.integer("p1_1");
      table.boolean("dragging");
      table.string("title");
      table.string("content");
      table.integer("p2_0");
      table.integer("p2_1");
      table.decimal("length",null);
      table.decimal("angle",null);
      table.string("style_Height");
      table.string("style_Width");
      table.string("style_backgroud_Color");
      table.string("style_position");
      table.string("style_top");
      table.string("style_left");
      table.string("style_transform");
      table.string("style_transform_origin");
      table.string("style_textboxUpright");
      table.string("style_textPosition");
      table.integer("noteID").unsigned();
      table.foreign("noteID").references('notes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("points");
};
