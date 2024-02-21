/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("blogs", function (table) {
      table
        .uuid("uuid")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("creator_user_uuid").notNullable();
      table.string("name", 255);
      table.string("slug", 255);
      table.string("content", 255);
      table.datetime("created_at");
      table.datetime("updated_at");
      table.datetime("deleted_at");
  
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
