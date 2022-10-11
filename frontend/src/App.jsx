import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import SecureRoute from './layout/SecureRoute'
import Proyectos from './pages/Proyectos'
import NuevoProyecto from './pages/NuevoProyecto'
import NuevoColaborador from './pages/NuevoColaborador'
import Proyecto from './pages/Proyecto'
import EditarProyecto from './pages/EditarProyecto'
import { AuthProvider } from './context/AuthProvider'
import { ProyectProvider } from './context/ProyectProvider'

function App() { 

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="sign-in" element={<Registrar/>}/>
              <Route path="forgot-password" element={<ForgotPassword/>}/>
              <Route path="forgot-password/:token" element={<NewPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>
            <Route path="/proyectos" element={<SecureRoute/>}>
              <Route index element={<Proyectos/>} />
              <Route path="crear-proyecto" element={<NuevoProyecto/>} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>} />
              <Route path=":id" element={<Proyecto/>} />
              <Route path="editar/:id" element={<EditarProyecto/>} />
            </Route>
          </Routes>
        </ProyectProvider>
      </AuthProvider> 
    </BrowserRouter>
  )
}

export default App
