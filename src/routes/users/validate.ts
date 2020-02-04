import joi from '@hapi/joi'
import { ContactObject } from './interface'

export const validateRegister = (body: ContactObject) => {
    const schema = joi.object({
        username: joi.string().trim(),
        email: joi.string().trim().email(),
        phone: joi.string().trim().min(10).required()
    })

    const { error, value } = schema.validate(body, {abortEarly: false, stripUnknown: true })
    
    return {
        error,
        value
    }
}