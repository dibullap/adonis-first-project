import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publicaciones extends BaseSchema {
  protected tableName = 'publicaciones'

  public async up () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('codigo_publicacion').primary();
      table.string('titulo', 100).notNullable();
      table.string('cuerpo', 200).notNullable();
      table.integer('codigo_usuario').unsigned().index('publicacion_codigo_usuario');
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade');
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
