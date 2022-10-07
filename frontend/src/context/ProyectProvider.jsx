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
        } catch (error) {
            console.log(error)
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
    }

    const submitTarea = async tarea => {
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
            console.log(data)
        } catch (error) {
            
        }
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
            submitTarea
        }}>{children} </ProyectContext.Provider>
    )
}

export {
    ProyectProvider
}

export default ProyectContext