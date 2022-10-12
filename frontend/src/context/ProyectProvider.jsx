import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ProyectContext = createContext()

const ProyectProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalFormTarea, setModalFormTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)

    const navigate = useNavigate()

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) )
    }

    useEffect(() => {
        const obtenerProyectos = async () => {
            try { 
                setLoading(true)
                await timeout(1800) 
                const token = localStorage.getItem('token')
                if(!token)  return 
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                } 
                const { data } = await axiosClient('/proyectos', config)
                setProyectos(data) 
            } catch (error) {
                console.log(error)
            } 
            setLoading(false)
        }
        obtenerProyectos()
    }, [])

    const showAlert = alerta => { 
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    } 

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/proyectos/${proyecto.id}`, proyecto, config) 

            //Sincronizar el State
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState) 
            setProyectos(proyectosActualizados)
            //Mostrar la Alerta
            setAlerta({
                msg: 'Proyecto Editado Correctamente',
                error: false
            })
            //Redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/proyectos', proyecto, config) 

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }


    const obtenerProyecto  = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/proyectos/${id}`, config)
            setProyecto(data.proyecto)
            setAlerta({})
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false)
        }
    }

    const eliminarProyecto = async id => {
        try { 
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.delete(`/proyectos/${id}`, config)

            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })
 
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalFormTarea(!modalFormTarea)
        setTimeout(() => { 
            setTarea({})
        }, 500)
    }

    const submitTarea = async tarea => {

        if(tarea?.id){
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

        
    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/tareas', tarea, config) 

            //Agregar Tareas al State
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/tareas/${tarea.id}`, tarea, config)

            //Actualizar el DOM
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualizado)

            setAlerta({})
            setModalFormTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    
    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/tareas/${tarea._id}`, config)

            setAlerta({
                msg: data.msg,
                error: false
            })
            //Actualizar el DOM
            const proyectoActualizado = { ...proyecto } 
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
            setProyecto(proyectoActualizado)
            setModalEliminarTarea(false)
            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`proyectos/colaboradores`, {email}, config)

            setColaborador(data)
            setAlerta({})
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
            setColaborador({})
        } finally {
            setLoading(false)
        }
    }   

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`proyectos/colaboradores/${proyecto._id}`, email, config)
            
            showAlert({
                msg: data.msg,
                error: false
            })
            setColaborador({})
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleEliminarColaborador = colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador)

        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)
            
            const proyectoActualizado = {...proyecto}

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )
            
            setProyecto(proyectoActualizado)

            showAlert({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)
 
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setModalEliminarColaborador(false)
        } 
    }

    const statusTarea = async id => {
        console.log(id)
    }
 
    return (    
        <ProyectContext.Provider value={{
            proyectos,
            showAlert,
            alerta, 
            obtenerProyecto,
            proyecto,
            loading,
            editarProyecto,
            nuevoProyecto,
            eliminarProyecto,
            modalFormTarea,
            handleModalTarea,
            submitTarea,
            tarea,
            handleModalEditarTarea,
            modalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            colaborador,
            submitColaborador,
            agregarColaborador,
            modalEliminarColaborador,
            handleEliminarColaborador,
            eliminarColaborador,
            statusTarea
        }}>{children} </ProyectContext.Provider>
    )
}

export {
    ProyectProvider
}

export default ProyectContext