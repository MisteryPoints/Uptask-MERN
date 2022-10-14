 import { Link } from 'react-router-dom'
 import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth } = useAuth()

    return (
        <aside className='md:w-1/3 lg:w-1/4 xl:w-1/5 px-5 py-10'>
            <p className='text-xl font-bold capitalize select-none'>Hola: {auth.nombre}</p>
            <Link to="crear-proyecto" className='bg-sky-600 p-3 text-white uppercase font-bold rounded-lg inline-block mt-5 text-center w-full md:w-auto hover:bg-sky-700'>Nuevo Proyecto</Link>
        </aside>
    )
}

export default Sidebar