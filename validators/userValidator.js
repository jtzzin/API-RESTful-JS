// 'Joi' é um framework de validações de dados
//estamos valiando todos os campos obrigatorios

const Joi = require("joi")

// Schema de validação para registro de usuario (POST)
const registerSchema = Joi.object({
    name: Joi.string().required().messages({ 
         'string.emp': 'Nome obrigatório'}),
        'any.required': 'o nome é obrigatório',
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "o email é obrigatório",
        "string.email": "o email é invalido",
        "any.required": "o email é obrigatorio",
    }),
    password: Joi.string().min(6).required().messages({
         "string.empty": "a senha é obrigatoria",
         "string.min": "a senha deve conter, no minimo, 6 caracteres",
         "any.required": "a senha é obrigatoria",
    }),
    confirmPassword:   Joi.string().valid(Joi.ref('password').required().messages({
        "string.empty": "a confirmação de senha é obrigatoria",
         "any.only": "as senhas sao conferem",
         "any.required": "a confirmação de senha é obrigatoria",
     }),
});

// Schema de validação para LOGIN de usuario (GET)
const loginSchema =     Joi.object({
    "string.empty": "a senha é obrigatoria",
    "any.required": "a senha é obrigatoria",

}),

// EXPORTANDO OS SCHEMAS CRIADOS PARA USAR EM OUTRO ARQUIVO
module.exports = {
    registerSchema,
    loginSchema,
};
    
