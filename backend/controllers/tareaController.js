import Tarea from "../models/Tareas.js"
import Proyecto from "../models/Proyecto.js"

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body
    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto){
        const error = new Error('El proyecto no Existe')
        return res.status(404).json({msg: error.message})
    }
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
        const error = new Error('No tienes los permisos adecuados')
        return res.status(401).json({msg: error.message})
    }
    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    } 
}
const obtenerTarea = async (req, res) => {
    const { id } = req.params
    const tarea = await Tarea.findById(id)
    const { proyecto } = tarea 
    const existeProyecto = await Proyecto.findById(proyecto)
    if(!tarea){
        const error = new Error('La tarea no fué encontrada')
        return res.status(404).json({msg: error.message})
    }
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
        const error = new Error('Acción no Valida')
        return res.status(401).json({msg: error.message})
    }  
    res.json(tarea) 
}

const actualizarTarea = async (req, res) => { 
    const { id } = req.params
    const tarea = await Tarea.findById(id)
    const { proyecto } = tarea 
    const existeProyecto = await Proyecto.findById(proyecto)
    if(!tarea){
        const error = new Error('La tarea no fué encontrada')
        return res.status(404).json({msg: error.message})
    }
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
        const error = new Error('Acción no Valida')
        return res.status(401).json({msg: error.message})
    }  

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try {
        const tareaAlmacenada = await tarea.save()
    } catch (error) {
        console.log(error)
    }
}
const eliminarTarea = async (req, res) => {}
const cambiarEstado = async (req, res) => {}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}