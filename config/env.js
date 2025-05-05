 // carrega as variaveis de ambiente
require("dotenv").config();

// lista de variaveis obrigatorias
const requireEnvVars = ["DB_USER", "DB_PASS", "SECRET"]

// filtra as variaveis ausentes
const missingEnvVars = requireEnvVars.filter((enVar) => !process.env[enVar]);


// se houver variaveis ausentes, exibe erro e encerra o processo
if (missingEnvVars.length > 0) {
    console.error(
        'Erro: Variaveis de amb. obrigatorias.: ${missingEnvVars.join(", ")}'
    );
    process.exit(1);
}


// Exportando as variaveis de ambiente para ser usada em outros arquivos
module.exports = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASS,
    secret: process.env.SECRET,
    port: process.env.PORT || 3000,
};

