 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usuarioModel");
 
const register = async (req, res, next) => {
    try{
        const {name,email,password} = req.body
        app.post("/auth/register", async (req, res) => {
            const {nome, email, password, confirmpassword} = req.body;
          
            // validação dos campos "!" signifca vazio
          
            if (!nome) {
              return res.status(422).json({ msg: "o nome é obrigatorio."});
            }
          
          
            if (!email) {
              return res.status(422).json({ msg: "o nome é obrigatorio."});
            }
            
          
            if (!password) {
              return res.status(422).json({ msg: "o nome é obrigatorio."});
            }
            
          
            if (password != confirmpassword) {
              return res
                  .status(422)
                  .json({ msg: "a senha e a confirmção nao conferem"})
            }
          
            // busca se existe o usuario no BD
            const userExists = await User.findOne({ email: email});
          
            // retorna uma msg para o usuario de duplicidade
            if (userExists) {
              return res.status(422).json({msg: "por favor, utilize outro email"});
          
            }
          
            // criptografia da senha
            const salt = await bcrypt.genSalt(12) // gera um salt para criptografar a senha com 12 caracteres diferentes
            const passwordHash = await bcrypt.hash(password, salt); // vai misturar a senha aleatoria dele com numeros aleatorius do hash
          
          
          // criar usuario conforme o Model 
          const user = new User({
            nome,
            email,
            password: passwordHash, // senha que a criptografia gerou
          });
          
          try {
            await user.save(); //pega o usuario e salva no banco de dados
          
            res.status(201).json({msg: "usuario criado com sucesso" })
 
    }
}
 
const loginUser = async(req, res, next) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if (!user){
            return res status(400).json (msg: "usuario não encontrado");
        }
        const CheckPassword = await bcrypt.compare(password, user.password);
        if (!CheckPassword) {
            return res.status(401).json({msg:"senha incorreta"});
        }
 
        const secret = process.env.secret;
        const token = jwt.sign({id:User._id},secret,{expiresIn:"id"});
 
        res.status(200).json({
            msg;"autenticação realizada com sucesso",
            token,
        });
    } catch(error){
        next(error);
    }
};
 
module.exports = {
    registerUser,
    loginUser
}