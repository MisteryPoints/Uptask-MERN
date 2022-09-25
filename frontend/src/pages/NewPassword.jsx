import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient'

const NewPassword = () => {
  
  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModify, setPasswordModify] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try { 
        await axiosClient(`/usuarios/forgot-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response,
          error: true
        })
      } 
    }
    comprobarToken()
  }, [])
  
  const { msg } = alerta
  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6) {
      setAlerta({
        msg: 'El Password debe ser mínimo de 6 carácteres',
        error: true
      })
      return
    } 
    try {
      const url = `/usuarios/forgot-password/${token}`
      const { data } = await axiosClient.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModify(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return ( 
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu Password y no pierdas acceso a tus <span className="text-slate-700">Proyectos</span></h1>
      { msg && <Alert alert={alerta} />}
      { tokenValido && (
      <form className="my-10 p-10 bg-white shadow rounded-lg" onSubmit={handleSubmit}>
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
          <input type="password" id="password" placeholder="Escribe tu Nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e => setPassword(e.target.value)}/>
        </div> 
        <input type="submit" value="Reestablece tu Password" className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
      )}
      { passwordModify && (
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">Inicia Sesión</Link>
      )}
    </>
  )
}

export default NewPassword