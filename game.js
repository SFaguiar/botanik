const botaoStart = document.getElementById('botaoStart')
const botaoProximo = document.getElementById('botaoProximo')
const elementoDeContainerDePergunta = document.getElementById('containerDaPergunta')
const elementoDaPergunta = document.getElementById('pergunta')
const elementoDosBotoesDeResposta = document.getElementById('botoesReposta')
let perguntasEmbaralhadas, indiceDaPerguntaAtual

var windowHeight = 0
var windowWidth = 0

botaoStart.addEventListener('click', iniciarJogo)
botaoProximo.addEventListener('click', () => {
    indiceDaPerguntaAtual++
    setProximaPergunta()
})

function getTamanhoDaJanela(){
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
}

function iniciarJogo(){
    console.log('Jogo iniciado!')
    botaoStart.classList.add('escondido')
    perguntasEmbaralhadas = perguntas.sort(() => Math.random() - .5)
    indiceDaPerguntaAtual = 0
    containerDaPergunta.classList.remove('escondido')
    setProximaPergunta()
}

function setProximaPergunta(){
    resetarEstado()
    mostrarPergunta(perguntasEmbaralhadas[indiceDaPerguntaAtual])
}

function resetarEstado (){
    clearStatusClass(document.body)
    botaoProximo.classList.add('escondido')
    while (elementoDosBotoesDeResposta.firstChild){
        elementoDosBotoesDeResposta.removeChild(elementoDosBotoesDeResposta.firstChild)
    }
}

function mostrarPergunta(pergunta){
    elementoDaPergunta.innerText = pergunta.pergunta
    pergunta.respostas.forEach(respostas => {
        const botao = document.createElement('button')
        botao.innerText = respostas.text
        botao.classList.add('botao')
        if (respostas.correto) {
            botao.dataset.correto = respostas.correto
        }
        botao.addEventListener('click', selecionarResposta)
        elementoDosBotoesDeResposta.appendChild(botao)
    })
}

function selecionarResposta(e){
    const botaoSelecionado = e.target
    const correto = botaoSelecionado.dataset.correto
    setStatusClass(document.body, correto)
    Array.from(elementoDosBotoesDeResposta.children).forEach(botao => {
        setStatusClass(botao, botao.dataset.correto)
    } )
    if (perguntasEmbaralhadas.length > indiceDaPerguntaAtual + 1) {
        botaoProximo.classList.remove('escondido')
    } else {
        botaoStart.innerText = 'Reiniciar'
        botaoStart.classList.remove('escondido')
    }
}

function setStatusClass(element, correto){
    clearStatusClass(element)
    if (correto) {
        element.classList.add('correto')
    } else {
        element.classList.add('errado')
    }
}

function clearStatusClass (element) {
    element.classList.remove('correto')
    element.classList.remove('errado')
}
