import { formatDate } from "../helpers/formatDate"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, statusTarea } = useProyectos()

    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea
 
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-xl capitalize">{ formatDate(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            </div>
            <div className="flex gap-4">
                {admin && (
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-700" onClick={() => handleModalEditarTarea(tarea)}>Editar</button>
                )}
                {estado ? (
                    <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-sky-700" onClick={() => statusTarea(_id)}>Completa</button>
                ) : (
                    <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-gray-700" onClick={() => statusTarea(_id)}>Incompleta</button>
                )}
                {admin && (
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700" onClick={() => handleModalEliminarTarea(tarea)}>Eliminar</button>
                )}
            </div>
        </div>
    )
}

export default Tarea