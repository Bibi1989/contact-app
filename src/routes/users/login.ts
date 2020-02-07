import express, { Router } from 'express'
const router = Router()
import { validateLogin } from './validate'
import { db, sql } from '../../model/contact-connect'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

router.post('/login', async (req, res) => {
    const { error, value } = validateLogin(req.body)
    if(error) {
        return res.status(404).json({ error: error.details[0].message })
    }
    const [existingUser] = await db.query(sql`SELECT * FROM users WHERE email = ${req.body.email}`)
    console.log(existingUser)
    if (!existingUser) {
        return res.status(404).json({ error: "Wrong email or you have not register" })
    }
    try {
        const { password } = req.body
        const validPassword = await bcrypt.compare(password, existingUser.password)
        if(!validPassword) {
            return res.status(404).json({data: "Invalid password"})
        }
        console.log('user')
        const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY)
        res.header("auth", token).status(200).json({ data: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email
            }, 
            token 
      })
    } catch (error) {
      return res.status(404).json({ error: error })
    }
})

export default router