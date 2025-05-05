const erroHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.isJoi) {
        return res.status(400).json({
            msg: "erro na validacao",
            errors: err.details.map((detail) => detail.message),
        });
    }
};

if (err.code === 1100) {
    return res.status(422).json{
        msg: "email ja cadastrado",
     })
}