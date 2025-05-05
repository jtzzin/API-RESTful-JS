require("dotenv").config(); // CARREGA AS VARIAVEIS DE AMBIENTE (.ENV)

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // É uma biblioteca para criptografar senhas
const jwt = require ("jsonwebtoken"); // biblioteca para criar e validar tokens


// Importando o modelo de Usuario
const User = require("./models/usuarioModel");

// Cria uma instância do Express
const app = express();

// Configura o express para entender req. em Json
app.use(express.json());

 // rota aberta
 app.get("/", (requisicao, resposta) => {
  resposta.status(200).send({msg: "bem vindo a API"});
});

// post para cadastrar usuario
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

  res.status(201).json({msg: "usuario criado com sucesso" }) // avisa o usuario que deu certo
  } catch (error) {
    res.status(500).json({msg: "Erro" }); // retorna um erro generico caso ocorra algum erro com o servidor
  }
});


// verifica se a senha é igual
const checkpassword = await bcrypt.compare(password, user.password);

if (!checkpassword) {
  return res.status(422).json({msg: "senha invalida"});
}

  try{
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user.id
      },
      secret
    );

    res.status(200).json({ msg: "autenticação realizada", token });
  } catch (error) {
    res.status(500).json({ msg: error});
  }

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Inicia o servidor na porta 3000 e conecta ao DB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.81ivp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco e o servidor na porta 3000");
  })
  .catch((err) => console.log(err));
