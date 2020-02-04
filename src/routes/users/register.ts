import express, { Request, Response, Router } from 'express'
const router = Router()
import { validateRegister } from './validate'
import { db, sql } from '../../model/contact-connect'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

router.post('/register', async (req, res) => {
    const { error, value } = validateRegister(req.body)
    if(error) {
        return res.status(404).json({ error: error.details[0].message })
    }
    const [existingUser] = await db.query(sql`SELECT email FROM users WHERE email = ${req.body.email}`)
    if (existingUser) {
      return res.status(404).json({ msg: "Email exist" })
    }
    try {
      const { username, email, password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const [contact] = await db.query(sql`
      INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) returning *`)
      const token = jwt.sign({ id: contact.id }, process.env.SECRET_KEY)
      res.header("auth", token).status(200).json({ data: {
          id: contact.id,
          username: contact.username,
          email: contact.email
        }, 
        token 
      })
    } catch (error) {
      res.status(404).json({ error: error })
    }
})