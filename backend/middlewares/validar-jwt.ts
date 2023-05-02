import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

export const validarJWT = async(req: Request , res: Response, next: NextFunction) => {

    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    };
    
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as PayloadJwt
        const usuario = await Usuario.findById(uid);        
        if(!usuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe BD'
            }); 
        };

        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuario con estado: false'
            });
        };

        (req as any).usuario = usuario;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

