import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center select-none"> Uptask </h2>
            <input type="search" placeholder="Buscar Proyecto" className="rounded-lg lg:w-96 block p-2 border focus:border-sky-500 focus:outline-none focus:border-2"/>
            <div className='flex items-center gap-4'>
                <Link to='/proyectos' className='font-bold uppercase underline decoration-transparent decoration-solid hover:decoration-black decoration-2'>Proyectos</Link>
                <button type='button' className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700'>Cerrar Sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header