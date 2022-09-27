import { useContext } from 'react'
import ProyectContext from '../context/ProyectProvider'

const useProyectos = () => {
    return useContext(ProyectContext)
}

export default useProyectos