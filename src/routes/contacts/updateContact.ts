import { Router } from 'express'
const router = Router()
import { Auth } from '../users/auth'
import { db, sql } from '../../model/contact-connect'

router.patch('/:updateID', Auth, async (req, res) => {
    try {
        const { updateID } = req.params
        console.log(updateID)
        const { first_name, last_name, email, phone, company } = req.body
        const [row] = await db.query(sql`UPDATE contacts SET first_name=${first_name}, last_name=${last_name}, email=${email}, phone=${phone}, company=${company} WHERE id = ${updateID}`)
        return res.status(200).json({
            data: row
        })
    } catch (error) {
        res.status(404).json({error: error})
    }
})


export default router