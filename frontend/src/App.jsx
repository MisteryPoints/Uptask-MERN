import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import SecureRoute from './layout/SecureRoute'
import Proyectos from './pages/Proyectos'
import { AuthProvider } from '../context/AuthProvider'

function App() { 

  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
        </Routes>
      </AuthProvider> 
    </BrowserRouter>
  )
}

export default App
