
@param {object}
    const { object } schema 

const validateRequest (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false})
        if ( error ) {
            return res.status(400).json({
                msg: "erro de validacao",
                errors: error.details.map(detail => detail.message)

            })

            next();
        }
    }
}
module.exports = validateRequest
