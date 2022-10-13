import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Tarea from '../components/Tarea'
import Alert from '../components/Alert'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'

const Proyecto = () => {
    const params = useParams()
    const { obtenerProyecto, proyecto, loading, handleModalTarea, alerta } = useProyectos() 

    const admin = useAdmin() 

    const [hover, setHover] = useState(false)  
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, []) 
    const { nombre } = proyecto  

    const { msg } = alerta  
 
    return (
        loading ? (
            <button type="button" className="bg-sky-600 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white   hover:bg-sky-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> 
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
          </button>
      ) :  (
            <>
                <div className='flex justify-between'>
                    <h1 className='font-black text-4xl select-none'>{nombre}</h1>
                {admin && (
                    <div className='hover:cursor-pointer  text-gray-600 hover:text-black'> 
                        <Link to={`/proyectos/editar/${params.id}`} className='uppercase font-bold flex items-center gap-2' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${hover && 'animate-spin'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                            </svg> 
                            Editar 
                        </Link>
                    </div>
                )}
                </div>
            {admin && (
                <button type='button' className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-center text-white mt-5 hover:bg-sky-500 flex justify-between gap-2'
                onClick={handleModalTarea}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clipRule="evenodd" />
                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                </svg>

                Nueva Tarea</button>
            )}
                <p className="font-bold text-xl mt-10">Tareas del Proyecto</p> 
                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto.tareas?.length ? proyecto.tareas?.map(
                            tarea => (<Tarea key={tarea._id} tarea={tarea}/>)
                        ) : (
                        <p className='text-center my-5 p-10'>No hay Tareas en este Proyecto</p>
                    )}
                </div>
            {admin && (
            <>
                <div className="flex items-center justify-between mt-10 "> 
                    <p className="font-bold text-xl">Colaboradores</p>
                    <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className='text-gray-600 uppercase font-bold hover:text-black flex justify-between gap-2'> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                        </svg> 
                        Añadir 
                    </Link>
                </div>
                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(
                            colaborador => (<Colaborador key={colaborador._id} colaborador={colaborador}/>)
                        ) : (
                        <p className='text-center my-5 p-10'>No existen Colaboradores en este Proyecto</p>
                    )}
                </div>

                <ModalFormularioTarea />
                <ModalEliminarTarea />
                <ModalEliminarColaborador/>
            </>
            )}
            </>
        )
    ) 
}

export default Proyecto