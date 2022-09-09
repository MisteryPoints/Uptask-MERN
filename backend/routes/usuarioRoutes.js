import express from 'express'
import { registrar, autenticar, confirmar, forgotPassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar) // Crear nuevo usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(comprobarToken).post(nuevoPassword)
//Es lo mismo que estas dos rutas ->
// router.get('/forgot-password/:token', comprobarToken)
// router.post('/forgot-password/:token', nuevoPassword)

router.get('/perfil', checkAuth, perfil)

export default router