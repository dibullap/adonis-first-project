import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuarioGrupos extends BaseSchema {
  protected tableName = 'usuario_grupos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('codigo_usuario').unsigned().index('u_g_codigo_usuario' );
      table .integer('codigo_grupo').unsigned().index('u_g_codigo_grupo');
      table.date('fecha_inicio').notNullable();
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade');
      table.foreign('codigo_grupo').references('grupos.codigo_grupo').onDelete('cascade');
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}
