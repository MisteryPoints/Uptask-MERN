import express from 'express'
import { registrar, autenticar, confirmar, forgotPassword } from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar) // Crear nuevo usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/forgot-password', forgotPassword)

export default router