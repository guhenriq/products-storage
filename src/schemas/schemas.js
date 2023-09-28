import Joi from "joi";

export const createUserSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password')
}).with('password', 'repeat_password');

export const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export const createProductSchema = Joi.object({
    name: Joi.string()
        .required(),
    description: Joi.string(),
    amount: Joi.number()
        .integer()
        .required()
})

export const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    amount: Joi.number()
        .integer()
})