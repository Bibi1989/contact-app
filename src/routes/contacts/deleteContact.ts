import { Router } from 'express'
const router = Router()
import { Auth } from '../users/auth'
import { db, sql } from '../../model/contact-connect'

router.delete('/:deleteID', Auth, async (req, res) => {
    try {
        const { deleteID } = req.params
        const [row] = await db.query(sql`DELETE FROM contacts WHERE id = ${deleteID}`)
        return res.status(200).json({
            data: `Deleted Successfully`,
        })
    } catch (error) {
        res.status(404).json({error: error})
    }
})


export default router