import { Link } from "react-router-dom"

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu Acceso y no Pierdas tus <span className="text-slate-700">Proyectos</span></h1>
      <form action="" className="my-10 p-10 bg-white shadow rounded-lg"> 
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
        </div> 
        <input type="submit" value="Enviar Instrucciones" className="bg-sky-700 w-full mb-5 py-3 font-bold text-white uppercase rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/sign-in" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}

export default ForgotPassword