import useProyectos from "../hooks/useProyectos"
import PreviewProyect from "../components/PreviewProyect"

const Proyectos = () => {

  const { proyectos, loading } = useProyectos() 
    

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
      <h1 className='text-4xl font-black select-none'>Proyectos</h1>
      <div className='bg-white shadow mt-10 rounded-lg '>
        {proyectos.length ?  proyectos.map(proyecto => (
          <PreviewProyect key={proyecto._id} proyecto={proyecto}/>
        )) : 
        <p className="text-center text-gray-600 uppercase p-5 select-none">
          No hay Proyectos aún
        </p>}
      </div>
    </>
  )
}

export default Proyectos