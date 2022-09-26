import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"
import useAuth from "../../hooks/useAuth"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { auth, setAuth, loading } = useAuth() 
 
  console.log(auth)
  console.log(loading)

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return
    }
    try {
      const { data } = await axiosClient.post('/usuarios/login', { email, password })
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y aministra tus <span className="text-slate-700">Proyectos</span></h1>
      {msg && <Alert alert={alerta}/>}
      <form action="" className="my-10 p-10 bg-white shadow rounded-lg" onSubmit={handleSubmit}>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <input type="submit" value="Iniciar Sesión" className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/sign-in" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Regístrate</Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvide mi Password</Link>
      </nav>
    </>
  )
}

export default Login