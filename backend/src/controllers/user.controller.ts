import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'

const getUserByUsername = (req: Request, res: Response) => {
    const { username } = req.session as { username: string }

    if (!username) {
        res.status(400).json({ error: 'No username found in session!' })
        return
    }

    const user = userModel.findByUsername(username)

    if (!user) {
        res.status(404).json({ error: 'User not found!'})
        return
    }

    res.status(200).json({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
    })
}

const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password} = req.body

    if (!username || !password) {
        res.status(400).json({ error: 'Username/password is missing!' })
        return
    }

    const user = await userModel.login(username, password)

    if (!user) {
        res.status(401).json({ error: ' invalid credentials!'})
        return
    }

    if (req.session) {
        req.session.isLoggedIn = true
        req.session.username = user.username

    }
res.status(200).json({ message: 'Succesfully logged in!'})
}

const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password, firstname, lastname } = req.body

    if (!username || !password || !firstname || !lastname) {
        res.status(400).json ({ error: 'All fields are required!' }) // ✅ Mejor práctica
        return
    }
    
    const newUser = await userModel.create({ username, password, firstname, lastname})

    if (!newUser) {
        res.status(409).json({ error: 'Username is already taken!' })
        return
    }

    res.status(201).json(newUser)

}   

const logout = (req: Request, res: Response) => {
    if (req.session) {
        req.session = null // 🔥 Forma correcta con `cookie-session`
        res.status(200).json({ message: 'Successfully logged out' })
    } else {
        res.status(400).json({ error: 'No active session found!' })
    }
}
export default {
    getUserByUsername,
    loginUser,
    addUser,
    logout,
}