import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('codigo_usuario').primary();
      table.string('nombre_usuario', 100).notNullable();
      table.string('email', 100).notNullable();
      table.string('contrasena', 100).notNullable();
      table.string('telefono', 15).notNullable();
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
