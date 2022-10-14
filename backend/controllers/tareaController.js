import Tarea from "../models/Tareas.js"
import Proyecto from "../models/Proyecto.js"

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body
    try { 
        const existeProyecto = await Proyecto.findById(proyecto) 
        if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
            const error = new Error('No tienes los permisos adecuados')
            return res.status(401).json({msg: error.message})
        }
        try {
            const tareaAlmacenada = await Tarea.create(req.body)
            //Almacenar el ID del Proyecto
            existeProyecto.tareas.push(tareaAlmacenada._id)
            await existeProyecto.save()
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error)
        }
    } catch { 
        const error = new Error('El proyecto no Existe')
        return res.status(404).json({msg: error.message})
    } 
}
const obtenerTarea = async (req, res) => {
    const { id } = req.params
    try { 
        const tarea = await Tarea.findById(id)
        const { proyecto } = tarea 
        const existeProyecto = await Proyecto.findById(proyecto) 
        if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
            const error = new Error('Acción no Valida')
            return res.status(401).json({msg: error.message})
        }  
        res.json(tarea) 
    } catch { 
        const error = new Error('La tarea no fué encontrada')
        return res.status(404).json({msg: error.message})
    }
}

const actualizarTarea = async (req, res) => { 
    const { id } = req.params
    try {
        const tarea = await Tarea.findById(id).populate("proyecto")
        const { proyecto } = tarea 
        const existeProyecto = await Proyecto.findById(proyecto) 
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
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error)
        }
    } catch { 
        const error = new Error('La tarea no fué encontrada')
        return res.status(404).json({msg: error.message})
    }
}
    
    
const eliminarTarea = async (req, res) => {
    const { id } = req.params
    try {
        const tarea = await Tarea.findById(id)
        const { proyecto } = tarea 
        const existeProyecto = await Proyecto.findById(proyecto)
        if (existeProyecto.creador.toString() !== req.usuario._id.toString()){ 
            const error = new Error('Acción no Valida')
            return res.status(401).json({msg: error.message})
        }   
        try {
            const proyecto = await Proyecto.findById(tarea.proyecto)
            proyecto.tareas.pull(tarea._id) 
            
            await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()])
            res.json({msg: 'La Tarea se eliminó'})
        } catch (error) {
            console.log(error)
        }
    } catch { 
        const error = new Error('La Tarea no fué encontrada')
        return res.status(404).json({msg: error.message})
    } 
}


const cambiarEstado = async (req, res) => {
    const { id } = req.params 
    const tarea = await Tarea.findById(id).populate("proyecto")
     
    if(!tarea){
        const error = new Error('La Tarea no fué encontrada')
        return res.status(404).json({msg: error.message}) 
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString() && !tarea.proyecto.colaboradores.some( colaborador => colaborador.id.toString() ) === req.usuario._id.toString()){
        const error = new Error('Acción no Valida')
        return res.status(403).json({msg: error.message})
    } 

    tarea.estado = !tarea.estado
    tarea.completado = req.usuario._id
    await tarea.save()

    const tareaAlmacenada = await Tarea.findById(id).populate("proyecto").populate("completado")

    res.json(tareaAlmacenada)
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}