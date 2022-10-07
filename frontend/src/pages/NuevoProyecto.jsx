import ProyectForm from "../components/ProyectForm"

const NuevoProyecto = () => {
  return (
    <>
        <h1 className='text-4xl font-black select-none'>Crear Proyecto</h1>
        <div className='mt-10 flex justify-center'>
            <ProyectForm/>
        </div>
    </>
  )
}

export default NuevoProyecto