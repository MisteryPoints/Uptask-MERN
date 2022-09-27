 import { Link } from 'react-router-dom'
 import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth } = useAuth()

    return (
        <aside className='md:w-80 lg:w-96 px-5 py-10'>
            <p className='text-xl font-bold capitalize'>Hola: {auth.nombre}</p>
            <Link to="crear-proyecto" className='bg-sky-600 p-3 text-white uppercase font-bold rounded-lg block mt-5 text-center '>Nuevo Proyecto</Link>
        </aside>
    )
}

export default Sidebar