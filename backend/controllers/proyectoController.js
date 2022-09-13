import Proyecto from "../models/Proyecto.js"

const obtenerProyectos = async (req, res) => { 
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id 
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params 
    try { 
        const proyecto = await Proyecto.findById(id) 
        if(proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error('Acción no valida')
            return res.status(401).json({ msg: error.message })
        }
        return res.json(proyecto) 
    } catch { 
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }   
}

const editarProyecto = async (req, res) => {
    const { id } = req.params 
    try { 
        const proyecto = await Proyecto.findById(id) 
        if(proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error('Acción no valida')
            return res.status(401).json({ msg: error.message })
        } 

        proyecto.nombre = req.body.nombre || proyecto.nombre
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
        proyecto.cliente = req.body.cliente || proyecto.cliente
        try {
            const proyectoAlmacenado = await proyecto.save()
            res.json(proyectoAlmacenado)
        } catch (error) {
            console.log(error)
        }
    } catch { 
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }   
}

const eliminarProyecto = async (req, res) => {
    const { id } = req.params 
    try { 
        const proyecto = await Proyecto.findById(id) 
        if(proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error('Acción no valida')
            return res.status(401).json({ msg: error.message })
        }
        try {
            await proyecto.deleteOne()
            res.json({msg: 'Proyecto Eliminado Correctamente.'})
        } catch (error) {
            console.log(error)
        } 
    } catch { 
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }       
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

const obtenerTareas = async (req, res) => {

}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}