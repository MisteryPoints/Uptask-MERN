import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'

const Proyecto = () => {
    const params = useParams()
    const { obtenerProyecto } = useProyectos()
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    return (
        <div>Proyecto</div>
    )
}

export default Proyecto