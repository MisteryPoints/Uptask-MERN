import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alert from "./Alert"

const ColaboradorForm = () => {

    const [email, setEmail] = useState('')

    const { showAlert, alerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if (email === '') {
            showAlert({
                msg: 'El email es Obligatorio',
                error: true
            })
            return
        }
        
        submitColaborador(email)
    }

    const { msg } = alerta


    return (
        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            {msg && <Alert alert={alerta}/>}
            <div className='mb-5'>
                <label htmlFor="email" className='text-gray-700 uppercase font-bold text-sm'>
                    Email del Colaborador
                </label>
                <input type="email" id='email' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:border-sky-500 focus:outline-none' placeholder="Email del Usuario" value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <input type="submit" className='bg-sky-600 hover:bg-sky-700 p-3 w-full text-white uppercase font-bold cursor-pointer transition-colors rounded-lg text-xs lg:text-sm' value='Buscar Colaborador'/>
        </form>
    )
}

export default ColaboradorForm