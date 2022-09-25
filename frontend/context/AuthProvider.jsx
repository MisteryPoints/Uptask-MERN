import { useState, useEffect, createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const [auth, setAuth] = useState({})

    useEffect(() => { 
        const authUser = async () => { 
            const token = localStorage.getItem('token')
            if (!token){
                return
            }
            console.log(data)
        }
        authUser()
    }, [])
    

    return (
        <AuthContext.Provider value={{
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext