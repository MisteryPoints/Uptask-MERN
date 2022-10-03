import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProyectContext = createContext()

const ProyectProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

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
        }
        obtenerProyectos()
    }, [])

    const showAlert = alerta => { 
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyect = async proyecto => {
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
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProyectContext.Provider value={{
            proyectos,
            showAlert,
            alerta,
            submitProyect,
            obtenerProyecto  
        }}>{children} </ProyectContext.Provider>
    )
}

export {
    ProyectProvider
}

export default ProyectContext