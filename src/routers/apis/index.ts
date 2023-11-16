import express from 'express'
import sumsubRouter from './sumsubRouter'

const router = express.Router()

router.use('/sumsub', sumsubRouter)

export default router