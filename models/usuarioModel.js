const mongoose = require("mongoose");

// estrutura do banco de dados (schema)
// o 'trim' remove os espaços em branco
// 'lowercase' salva tudo em minusculo
// 'select' nao mostra nas consultas do banco de dados
// criamos user, email, senha e new usuer com data atual => (sempre que criarmos um user novo, o cod vai pegar a data atual da criação pelo 'createdAt')
//  uma variavel que cria a tabela 'User' no banco de dados
// por fim, exporta as variaveis de ambiente (sensiveis) para usar em outros arquivos
// tambem temos as tratativas do codigo 'usando os campos obrigatorios'

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Nome obrigatorio"], trim: true 
    },
    email: {
        type: String, required: [true, "Email obrigatorio"], unique: true,
        trim: true, lowercase: true 
    },
    password: {
        type: String, required: [true, "Senha obrigatoria"], select: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)


module.exports = User;

