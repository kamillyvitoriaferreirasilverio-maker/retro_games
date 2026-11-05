
const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById('btnCadastrar')
const btnCancelar = document.getElementById('btnCancelar')
const modal = document.getElementById('modalCadastro')
const form = document.getElementById('formJogo')
const lista = document.getElementById('listarJogos')
const mensagemVazia = document.getElementById('mensagemVazia')

btnCadastrar.addEventListener('click', () => {
    modal.showModal()
})

btnCancelar.addEventListener('click', () => {
    modal.close()
})

async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + "/listar")
        const jogos = await resposta.json()

        lista.innerHTML = ""

        if (jogos.length === 0) {
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true

        jogos.forEach((jogo) => {
            criarCard(jogo.titulo, jogo.plataforma, jogo.desenvolvedora, jogo.imagem_url, jogo.preco)
        })

    } catch (erro) {
        console.error("Erro ao carregar jogos:", erro)
        alert("Não foi possível conectar ao servidor.")
    }
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    const novoJogo = {
        titulo: document.getElementById('titulo').value.trim(),
        plataforma: document.getElementById('plataforma').value.trim(),
        desenvolvedora: document.getElementById('desenvolvedora').value.trim(),
        imagem_url: document.getElementById('imagem').value.trim(),
        preco: Number(document.getElementById('preco').value)
    }

    try {
        const resposta = await fetch(API_URL + "/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        })

        if (resposta.ok) {
            form.reset()
            modal.close()
            carregarJogos()
        } else {
            alert("Erro ao salvar jogo. Verifique os dados.")
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor.")
    }
})

function criarCard(titulo, plataforma, desenvolvedora, imagem, preco) {
    const card = document.createElement('article')
    card.classList.add('card-jogo')

    const etiqueta = document.createElement('span')
    etiqueta.classList.add('plataforma')
    etiqueta.textContent = plataforma

    const capa = document.createElement('div')
    capa.classList.add('capa')

    const imagemCapa = document.createElement('img')
    imagemCapa.src = imagem
    imagemCapa.alt = 'Capa de ' + titulo
    capa.appendChild(imagemCapa)

    const info = document.createElement('div')
    info.classList.add('info-jogo')

    const nome = document.createElement('h3')
    nome.textContent = titulo

    const nomeDev = document.createElement('p')
    nomeDev.textContent = 'Desenvolvedora: ' + desenvolvedora

    const valor = document.createElement('strong')
    valor.classList.add('preco')
    valor.textContent = Number(preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    info.append(nome, nomeDev, valor)
    card.append(etiqueta, capa, info)
    lista.append(card)
}

carregarJogos()
