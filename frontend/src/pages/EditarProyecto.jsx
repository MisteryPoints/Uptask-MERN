import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from "../hooks/useProyectos"
import ProyectForm from '../components/ProyectForm'

const EditarProyecto = () => {
    const params = useParams()
    const { obtenerProyecto, proyecto, loading, eliminarProyecto } = useProyectos() 
    
    const [hover, setHover] = useState(false)
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, []) 

    const handleClick = () => {
        if(confirm('¿Deseas Eliminar este Proyecto?')){
            eliminarProyecto(params.id)
        } else {
            console.log('No')
        }
    }

    const { nombre } = proyecto

    if(loading) return (
        <button type="button" className="bg-sky-600 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white   hover:bg-sky-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> 
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando...
        </button>
    )

    return (
        <> 
            <div className='flex justify-between'>
                <h1 className='font-black text-4xl select-none'>Editar Proyecto: {nombre}</h1>
                <div className='hover:cursor-pointer  text-gray-600 hover:text-red-700 flex items-center gap-2' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${hover && 'animate-bounce'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    <button className='uppercase font-bold' onClick={handleClick}>Eliminar</button>  
                </div>
            </div> 
            <div className='mt-10 flex justify-center'>
                <ProyectForm/>
            </div>
        </>
    )
}

export default EditarProyecto