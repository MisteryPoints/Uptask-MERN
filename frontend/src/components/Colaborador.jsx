import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {

    const { nombre, email } = colaborador

    const { modalEliminarColaborador, handleEliminarColaborador } = useProyectos()

    return (
        <div>
            <div className="border-b p-5 flex justify-between items-center hover:cursor-default">
                <div>
                    <p>{nombre}</p>
                    <p className="text-sm text-gray-700">{email}</p>
                </div>
                <div>
                    <button type="button" className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg uppercase hover:bg-red-700" onClick={() => handleEliminarColaborador(colaborador)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default Colaborador