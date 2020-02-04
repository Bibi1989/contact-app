import joi from '@hapi/joi'
import { ContactObject } from './interface'

export const validateRegister = (body: ContactObject) => {
    const schema = joi.object({
        username: joi.string().trim(),
        email: joi.string().trim().email(),
        password: joi.string().trim().min(4).required()
    })

    const { error, value } = schema.validate(body, {abortEarly: false, stripUnknown: true })
    
    return {
        error,
        value
    }
}

export const validateLogin = (body: ContactObject) => {
    const schema = joi.object({
        email: joi.string().trim().email(),
        password: joi.string().trim().min(4).required()
    })

    const { error, value } = schema.validate(body, {abortEarly: false, stripUnknown: true })
    
    return {
        error,
        value
    }
}