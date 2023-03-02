// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
    public async getListarUsuarios(): Promise<Usuario[]> {
        const user = await Usuario.all()
        return user;
    }

    public async getListarUsuariosYPerfil(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('perfil')
        return user;
    }

    public async getListarUsuariosYPublicacion(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('publicaciones')
        return user;
    }

    public async getListarUsuariosGrupos(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('usuario_grupo')
        return user;
    }

    public async setRegistrarUsuarios({request, response}: HttpContextContract) {
        const dataUsuario = request.only([
            'codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono', 'perfil'
        ])
        try {
            const codigoUsuario = dataUsuario.codigo_usuario;
            const usuarioExistente: number = await this.getValidarUsuarioExistente(codigoUsuario)
            if (usuarioExistente === 0){
                await Usuario.create(dataUsuario)
                response.status(200).json({"msg": "Registro completado con exito"})
            } else {
                response.status(400).json({"msg": "Error, el codigo usuario ya se encuentra registrado"})
            }
        } catch (error){
            response.status(500).json({"msg": "Error en el servidor !!"})
        }
    }

    private async getValidarUsuarioExistente(codigo_usuario: number): Promise<number> {
        const total = await Usuario.query().where({"codigo_usuario": codigo_usuario}).count('*').from('usuarios')
        return parseInt(total[0]["count"])
    }
}
