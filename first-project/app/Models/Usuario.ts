import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicacion from './Publicacion'
import Grupo from './Grupo'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public codigo_usuario: number

  @column()
  public nombre_usuario: string

  @column()
  public contrasena: string

  @column()
  public email: string

  @column()
  public telefono:   string

  @hasOne(() => Perfil, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public perfil: HasOne<typeof Perfil>

  @hasMany(() => Publicacion, {
    localKey: 'codigo_usuario', 
    foreignKey: 'codigo_usuario',
  })
  public publicaciones: HasMany<typeof Publicacion>

  @manyToMany(() => Grupo, {
    localKey: 'codigo_usuario', 
    pivotForeignKey: 'codigo_usuario', 
    relatedKey: 'codigo_usuario',
    pivotRelatedForeignKey: 'codigo_grupo', 
    pivotTable: 'usuario_grupos',  
  })
  public usuario_grupo: ManyToMany<typeof Grupo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
