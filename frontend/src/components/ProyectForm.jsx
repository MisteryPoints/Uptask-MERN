import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alert from "./Alert"

const ProyectForm = () => {

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')

  const { alerta, showAlert, submitProyect } = useProyectos()

  const handleSubmit = async e => {
    e.preventDefault()
    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      showAlert({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return
    }

    //Pasar los datos al Provider
    await submitProyect({nombre, descripcion, fechaEntrega, cliente})
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }

  const { msg } = alerta

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md" onSubmit={handleSubmit}>

      {msg && <Alert alert={alerta}/>}
      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
        <input type="text" id="nombre" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:border-sky-500 focus:outline-none focus:border-2" placeholder="Nombre del Proyecto" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción Proyecto</label>
        <textarea id="descripcion" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:border-sky-500 focus:outline-none focus:border-2" placeholder="Descripción del Proyecto" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      </div>
      <div className="mb-5">
        <label htmlFor="fechaEntrega" className="text-gray-700 uppercase font-bold text-sm">Fecha Entrega</label>
        <input type="date" id="fechaEntrega" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:border-sky-500 focus:outline-none focus:border-2" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
      </div>
      <div className="mb-5">
        <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre Cliente</label>
        <input type="text" id="cliente" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-lg focus:border-sky-500 focus:outline-none focus:border-2" placeholder="Nombre del Cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
      </div> 
      <input type="submit" value='Crear Proyecto' className="bg-sky-600 w-full text-white uppercase text-lg font-bold rounded-lg p-2 hover:bg-sky-700 cursor-pointer transition-colors"/>
    </form>
  )
}

export default ProyectForm