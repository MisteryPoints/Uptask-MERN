import { formatDate } from "../helpers/formatDate"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, statusTarea } = useProyectos()

    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id, completado } = tarea
 
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start hover:cursor-default">
                <p className="mb-1 text-xl w-[90%]">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase w-[90%]">{descripcion}</p>
                <p className="mb-1 text-xl capitalize w-[90%]">{ formatDate(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600 ">Prioridad: {prioridad}</p>
                { estado && <p className="text-xs bg-green-700 uppercase p-1 rounded-lg text-white">Completada por: {completado?.nombre}</p>}
            </div>
            <div className="flex gap-4 flex-col lg:flex-row">
                {admin && (
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-700" onClick={() => handleModalEditarTarea(tarea)}>Editar</button>
                )} 
                <button className={`${estado ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-600 hover:bg-gray-700'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg `} onClick={() => statusTarea(_id)}>{estado ? 'Completa' : 'Incompleta'}</button>
                {admin && (
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700" onClick={() => handleModalEliminarTarea(tarea)}>Eliminar</button>
                )}
            </div>
        </div>
    )
}

export default Tarea