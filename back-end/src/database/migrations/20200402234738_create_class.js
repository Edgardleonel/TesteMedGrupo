exports.up = function(knex) {
    return knex.schema.createTable('group', function(table) {
      table.increments();
      table.string('title').notNullable();
      table.decimal('quantity').notNullable();
      table.decimal('idSchool').notNullable();

    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };