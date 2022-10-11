import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tareas.js"
import Usuario from "../models/Usuario.js"

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
        const proyecto = await Proyecto.findById(id).populate('tareas').populate('colaboradores', 'nombre email')
        if(proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error('Acción no valida')
            return res.status(401).json({ msg: error.message })
        }
        //Obtener las Tareas del Proyecto
        const tareas = await Tarea.find().where('proyecto').equals(proyecto._id) 
        res.json({ proyecto, tareas }) 
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

const buscarColaborador = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario) {
        const error = new Error('Usuario no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    res.json(usuario)
}

const agregarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id)

    if(!proyecto){
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if( proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Acción no Valida')
        return res.status(403).json({ msg: error.message })
    }

    const { email } = req.body
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario) {
        const error = new Error('Usuario no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    // Admin no puede ser Colaborador
    if( proyecto.creador.toString() === usuario._id.toString() ){
        const error = new Error('El creador del Proyecto no puede ser Colaborador')
        return res.status(403).json({ msg: error.message })
    }
    // Revisar que no este ya añadido
    if( proyecto.colaboradores.includes(usuario._id)){
        const error = new Error('El Usuario ya pertenece al Proyecto')
        return res.status(403).json({ msg: error.message })
    }
    //Agregar
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    res.json({ msg: 'Colaborador Agregado Correctamente' })
}

const eliminarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id)

    if(!proyecto){
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if( proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('Acción no Valida')
        return res.status(403).json({ msg: error.message })
    }
 

    //Eliminar
    proyecto.colaboradores.pull(req.body.id) 
    await proyecto.save()
    res.json({ msg: 'Colaborador Eliminado Correctamente' })
} 

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador 
}