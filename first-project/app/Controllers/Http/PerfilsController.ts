import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    async setRegistrarPerfil({request, response}: HttpContextContract) {
        try {
            const dataPerfil = request.only([
                'codigo_perfil', 'codigo_usuario', 'nombre_perfil', 'fecha_creacion'
            ])
            const codigoPerfil = dataPerfil.codigo_perfil;
            const perfilExistente: number = await this.getValidarPerfilExistente(codigoPerfil);
            if (perfilExistente === 0){
                await Perfil.create(dataPerfil)
                response.status(200).json({"msg":"Registro de perfil completado"})
            } else {
                response.status(400).json({"msg":"Error, el codigo perfil ya se encuentra registrado"})
            }
        } catch (error){
            response.status(500).json({"msg":"Error en el servidor !!"})
            console.log(error)
        }
    }

    private async getValidarPerfilExistente(codigo_perfil: number): Promise<number> {
        const total = await Perfil.query().where({"codigo_perfil":codigo_perfil}).count('*').from('perfiles')
        return parseInt(total[0]["count"])
    }
}
