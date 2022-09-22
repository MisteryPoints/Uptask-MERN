 

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu Password y no pierdas acceso a tus <span className="text-slate-700">Proyectos</span></h1>
      <form action="" className="my-10 p-10 bg-white shadow rounded-lg">
        <div className="my-5 ">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
          <input type="password" id="password" placeholder="Escribe tu Nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
        </div> 
        <input type="submit" value="Reestablece tu Password" className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-lg border cursor-pointer hover:bg-sky-800 transition-all duration-300" />
      </form>
    </>
  )
}

export default NewPassword