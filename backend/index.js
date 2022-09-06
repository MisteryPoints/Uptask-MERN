import express from 'express'
import prueba from './prueba.js'
import conectarDB from './config/db.js'

const app =  express()

conectarDB()

app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000')
    console.log(prueba)
})

