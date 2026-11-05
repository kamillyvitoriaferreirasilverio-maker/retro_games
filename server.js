
const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retrogames"
})

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar:", erro)
    } else {
        console.log("Conectado ao BD")
    }
})

const mostrarJogos = (req, res) => {
    const sql = "SELECT id, titulo, plataforma, desenvolvedora, imagem_url, preco FROM jogos"
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao consultar o BD")
        }
        res.send(resultados)
    })
}

const novoJogo = (req, res) => {
    const { titulo, plataforma, desenvolvedora, imagem_url, preco } = req.body

    if (titulo && plataforma && desenvolvedora && imagem_url && preco) {
        const sql = "INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [titulo, plataforma, desenvolvedora, imagem_url, preco]

        db.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return res.status(500).send("Erro ao inserir jogo")
            }
            res.send("Jogo cadastrado com sucesso")
        })
    } else {
        res.status(400).send("Erro: Preencha todos os campos")
    }
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.get("/listar", mostrarJogos)
app.post("/cadastrar", novoJogo)

app.listen(porta, () => {
    console.log(`Servidor rodando (alegria) porta ${porta}`)
})
