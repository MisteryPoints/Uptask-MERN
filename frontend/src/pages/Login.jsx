import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y aministra tus <span className="text-slate-700">Proyectos</span></h1>
      <form action="" className="my-10 p-10 bg-white shadow rounded-lg">
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
        </div>
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
        </div>
        <input type="submit" value="Iniciar Sesión" className="bg-sky-700 w-full mb-5 py-3 text-white uppercase rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/sign-in" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Regístrate</Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvide mi Password</Link>
      </nav>
    </>
  )
}

export default Login