exports.up = function(knex) {
    return knex.schema.createTable('class', function(table) {
      table.increments();
      table.string('title').notNullable();
      table.decimal('quantity').notNullable();

      table.string('schools_id').notNullable();

      table.foreign('schools_id').references('id').inTable('schools')

    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('class');
  };