import { Router, Request, Response } from 'express'
const router = Router()
import { validatePost } from '../users/validate'
import { db, sql } from '../../model/contact-connect'
import { Auth } from '../users/auth'

router.post('/', Auth, async (req: any, res) => {
    const {first_name, last_name, phone, email, company} = req.body
    const data = {
        first_name, 
        last_name,
        phone,
        email,
        company
    }
    const { error, value } = validatePost(data)
    console.log(value)
    console.log(req.body)
    if(error) {
        return res.status(404).json({ error: error.details[0].message })
    }
    console.log(req.body)
    const [user] = await db.query(sql`SELECT phone FROM contacts WHERE phone = ${req.body.phone}`)
    if (user) return res.status(404).json({ error: "Contact already exist" })

    try {
        const { first_name, last_name, phone, email, company } = value
        const [contact] = await db.query(sql`INSERT INTO contacts(first_name, owner_id, last_name, phone, email, company) VALUES (${first_name}, ${req.user.id}, ${last_name}, ${phone}, ${email}, ${company}) RETURNING *`)
        res.status(200).json({ data: contact })
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

export default router