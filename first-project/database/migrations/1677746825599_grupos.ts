import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Grupos extends BaseSchema {
  protected tableName = 'grupos'

  public async up () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('codigo_grupo').primary();
      table.string('nombre_grupo', 100).notNullable();
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
