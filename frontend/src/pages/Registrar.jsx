import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert" 
import axiosClient from "../config/axiosClient"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if([nombre, email, password, password2].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      }) 
      return
    }
    if(password !== password2){
      setAlert({
        msg: 'Los Passwords no son iguales',
        error: true
      }) 
      return
    }
    if(password.length < 6){
      setAlert({
        msg: 'El Password es muy corto, colocar mínimo 6 carácteres',
        error: true
      }) 
      return
    }
    setAlert({})
    // Crear usuario en la API
    try { 
      const { data } = await axiosClient.post(`/usuarios`, {nombre, email, password})
      
      setAlert({
        msg: data.msg,
        msg2: data.msg2,
        error: false
      })
      setNombre('')
      setEmail('')
      setPassword('')
      setPassword2('')
      setTimeout(() => {
        setAlert({})
      }, 8000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alert

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y Administra tus <span className="text-slate-700">Proyectos</span></h1>
      { msg && <Alert alert={alert}/> }
      <form onSubmit={handleSubmit} className="my-5 p-10 bg-white shadow rounded-lg">
        <div className="my-5">
          <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
          <input type="text" id="nombre" placeholder="Nombre de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="my-5 ">
          <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
          <input type="password" id="password2" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password2} onChange={e => setPassword2(e.target.value)}/>
        </div>
        <input type="submit" value="Crear Cuenta" className="bg-sky-700 w-full mb-5 py-3 font-bold text-white uppercase rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvide mi Password</Link>
      </nav>
    </>
  )
}

export default Registrar