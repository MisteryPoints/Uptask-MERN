import express from 'express'
import dotenv from 'dotenv' 
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app =  express()
app.use(express.json())

dotenv.config()

conectarDB()
//Configurar CORS
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2, process.env.FRONTEND_URL3]
const corsOptions = { //origin es una convencion de CORS que se refiere a la direccion de origen del request, callback es el mensaje retornado de la API
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //Puede consultar la API
            callback(null, true)
        } else {
            //No permite el Request
            callback(new Error('Error de CORS'))
        }
    }
}
//Server usa CORS con mis opciones indicadas
app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000 
const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: whitelist
    }
})

io.on('connection', socket => {
    console.log('Conectado a Socket.io')

    //Definir los eventos de Socket.io 
    socket.on('abrir proyecto', proyecto => {
        socket.join(proyecto)  
    })

    socket.on('nueva tarea', tarea => {
        const proyecto = tarea.proyecto  
        socket.to(proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('editar tarea', tarea => {
        const proyecto = tarea.proyecto._id 
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('estado tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea status', tarea)
    })
})