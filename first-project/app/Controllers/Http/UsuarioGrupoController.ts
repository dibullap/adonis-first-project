import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'

export default class UsuarioGrupoController {
    public async setRegistrarUsuarioGrupo({request, response}: HttpContextContract){
        try {
            const dataUsuarioGrupo = request.only(['codigo_usuario', 'codigo_grupo', 'fecha_inicio'])
            const codigoUsuario = dataUsuarioGrupo.codigo_usuario
            const codigoGrupo = dataUsuarioGrupo.codigo_grupo
            const datosExistentes: Number = await this.getValidarDatosUsuarioYGrupo(codigoUsuario, codigoGrupo)
            switch (datosExistentes){
                case 0:
                    await UsuarioGrupo.create(dataUsuarioGrupo)
                    response.status(200).json({"msg":"Registro de Usuario-Grupo completado"})
                    break;
                case 1:
                    response.status(400).json({"msg": "El codigo del usuario no se encuentra"})
                    break;
                case 2:
                    response.status(400).json({"msg":"El codigo del grupo no se encuentra"})
                    break;
            }
        } catch (error){
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor"})
        }
    }
    private async getValidarDatosUsuarioYGrupo(codigo_usuario: number, codigo_grupo: number): Promise<number>{
        let total = await Grupo.query().where({"codigo_grupo": codigo_grupo}).count('*').from('grupos')
        let cantidadDatos = parseInt(total[0]['count (*)'])
        if (cantidadDatos !== 0){
            total = await Usuario.query().where({'codigo_usuario': codigo_usuario}).count('*').from('usuarios')
            cantidadDatos = parseInt(total[0]['count (*)'])
            if (cantidadDatos !== 0){
                return 0;
            } else {
                return 2;
            }
        } else {
            return 1;
        }
    }
}
