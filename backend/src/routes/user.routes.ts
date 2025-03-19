import { Router } from 'express'
import { authMiddleware, checkLoggedOut } from '../middlewares/auth.middleware'
import userController from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/signup', userController.addUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/logout', userController.logout)
userRouter.get('/check-auth', authMiddleware, userController.getUserByUsername)

export default userRouter