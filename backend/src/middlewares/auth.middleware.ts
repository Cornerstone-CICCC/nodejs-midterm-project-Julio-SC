import { Request, Response, NextFunction } from 'express'



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        next() // El usuario está autenticado, puede continuar
    } else {
        res.status(401).json({ error: 'Unauthorized access! Please log in.' })
    }
}

export const checkLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(200).json({ 
            message: 'User is already logged in. Redirecting to profile...'
        })
    } else {
        next() // Si no está logueado, puede continuar
    }
}