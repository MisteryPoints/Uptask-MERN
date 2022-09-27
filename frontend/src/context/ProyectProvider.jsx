import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'

const ProyectContext = createContext()

const ProyectProvider = ({children}) => {


    return (
        <ProyectContext.Provider value={{

        }}>{children} </ProyectContext.Provider>
    )
}

export {
    ProyectProvider
}

export default ProyectContext