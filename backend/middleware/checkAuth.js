import jwt  from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const checkAuth = async (req, res, next) => {
    let token, decoded 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         
        try {   
            token = req.headers.authorization.split(' ')[1]
            if(!token){
                const error = new Error("Token no Agregado")
                return res.status(401).json({msg: error.message})
            } 
            decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.usuario = await Usuario.findById(decoded.id).select(
                "-password -confirmado -token -createdAt -updatedAt -__v"
            )
            return next()
        } catch (error) {
            return res.status(404).json({msg: "Token no Valido"})
        }
    }
 
}

export default checkAuth