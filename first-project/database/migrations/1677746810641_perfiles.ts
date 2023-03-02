import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfiles extends BaseSchema {
  protected tableName = 'perfiles'

  public async up () {
    this.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('codigo_perfil').primary();
      table.string('nombre_perfil', 100).notNullable();
      table.date('fecha_creacion').notNullable();
      table.integer('codigo_usuario').unsigned().unique().index('perfil_codigo_usuario');
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade');
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
