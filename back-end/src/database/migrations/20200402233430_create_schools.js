
exports.up = function(knex) {
    return knex.schema.createTable('schools', function(table) {
      table.string('id').primary();
      table.string('description').notNullable();
      table.string('address').notNullable();
      table.string('email').notNullable();
      table.string('telephone').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('schools');
  };
  