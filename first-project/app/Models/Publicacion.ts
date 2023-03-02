import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Publicacion extends BaseModel {
 public static table = 'publicaciones';

 @column({ isPrimary: true })
 public codigo_publicacion: number

 @column()
 public codigo_usuario: number 

 @column()
 public titulo: string

 @column()
 public cuerpo: strin

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
