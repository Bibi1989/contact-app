import { Router } from 'express'
const router = Router()
import { Auth } from '../users/auth'
import { db, sql } from '../../model/contact-connect'

router.get('/', Auth, async (req: any, res) => {
    const rows = await db.query(sql`SELECT * FROM contacts WHERE owner_id=${req.user.id};`)
    res.status(200).json({ data: rows })
})

router.get('/:contactID', Auth, async (req, res) => {
    const { contactID } = req.params
    try {
        const [row] = await db.query(sql`SELECT * FROM contacts WHERE id = ${contactID};`)
        if(!row) return res.status(404).json("No such user")
        res.status(200).json(row)
    } catch (error) {
        res.status(404).json({error: error})
    }
})

router.delete('/delete/:deleteID', async (req, res) => {
    const { deleteID } = req.params
    try {
        const row = await db.query(sql`DELETE FROM contacts WHERE id = ${deleteID}`)
        res.status(200).json({
            data: `Deleted ${row[0].email} Successfully`,
        })
    } catch (error) {
        res.status(404).json({error: "No user"})
    }
})


export default router