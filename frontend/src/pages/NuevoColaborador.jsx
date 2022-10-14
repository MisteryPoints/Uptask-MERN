import { useEffect } from "react"
import ColaboradorForm from "../components/ColaboradorForm"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, loading, colaborador, agregarColaborador, alerta, showAlert } = useProyectos()

    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
        if(colaborador == {}) return
        showAlert({})
    }, []) 
     
    
    return (
        <>
            <h1 className='text-4xl font-black'>Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
            <div className="mt-10 flex justify-center ">
                {loading ? '' : !proyecto?._id ? <Alert alert={alerta}/> : <ColaboradorForm/>}
            </div>

            {loading ? (
                <div className="flex justify-center"> 
                    <button type="button" className="bg-sky-600 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white mt-10  hover:bg-sky-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> 
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Cargando...
                    </button>
                </div>
            ) : colaborador?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
                        <h2 className="text-center mb-10 text-2xl font-bold">
                            Resultado:
                        </h2>
                        <div className="flex flex-col lg:flex-row justify-between items-center ">
                            <p className="text-xl mb-2 lg:mb-0">{colaborador.nombre}</p>
                            <button type="button" className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-xs lg:text-sm" onClick={() => agregarColaborador({
                                email: colaborador.email
                            })}>Agregar al Proyecto</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NuevoColaborador