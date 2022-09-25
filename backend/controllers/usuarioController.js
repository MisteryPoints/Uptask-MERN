import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailForgotPassword } from '../helpers/mails.js'

const registrar = async (req,res) => { 
    // Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }
    
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()

        //Enviar el email de Confirmación.
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        
        res.json({msg: 'Usuario creado Correctamente', msg2: 'Revisa tu email para confirmar tu cuenta'})
    } catch (error) {
        console.log(error)
    } 
}

const autenticar = async (req, res) => {
    const { email, password } = req.body
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if(!usuario) {
        const error = new Error('Usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message})
    }
 
    //Comprobar su password
    if(await usuario.comprobarPassword(password)){
        return res.status(200).json({ 
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error('La Clave ingresada es Incorrecta')
        return res.status(403).json({msg: error.message})
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    if(!usuarioConfirmar) {
        const error = new Error('Token no Válido')
        res.status(403).json({msg: error.message})
    }
    
    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        await usuarioConfirmar.save()
        res.json({msg: "Usuario Confirmado Correctamente"}) 
    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email })
    if(!usuario) {
        const error = new Error('El Usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()

        //Enviar el email
        emailForgotPassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({ msg: 'Hemos enviado un Email con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Usuario.findOne({ token })

    if(tokenValido) {
        res.json({ msg: 'Token Valido y el Usuario Existe' })
    } else {
        const error = new Error('Token no Válido')
        return res.status(404).json({ msg: error.message })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const usuario = await Usuario.findOne({ token })
    if(usuario) {
        usuario.password = password
        usuario.token = ''
        await usuario.save()
        res.json({ msg: 'Password Modificado Correctamente' })
    } else {
        const error = new Error('Token no Válido')
        return res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export { 
    registrar,
    autenticar,
    confirmar,
    forgotPassword,
    comprobarToken,
    nuevoPassword,
    perfil
}