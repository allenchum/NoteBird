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
    return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("title");
    table.string("description");
    table.timestamps(false, true);
    table.string("status");
    table.integer("userID").unsigned();
    table.foreign("userID").references('users.id');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("notes");
};
