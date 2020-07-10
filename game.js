const botaoStart = document.getElementById('botaoStart')
const botaoRegras = document.getElementById('botaoRegras')
const botaoConfiguracoes = document.getElementById('botaoConfiguracoes')

const containerDaPergunta = document.getElementById('containerDaPergunta')
const displayScore = document.getElementById('score')
const textoDaPergunta = document.getElementById('pergunta')
const elementoDosBotoesDeResposta = document.getElementById('botoesReposta')
const botao1 = document.getElementById('botaoAlternativa1')
const botao2 = document.getElementById('botaoAlternativa2')
const botao3 = document.getElementById('botaoAlternativa3')
const botao4 = document.getElementById('botaoAlternativa4')
const botaoProximo = document.getElementById('botaoProximo')
const botaoAjuda = document.getElementById('botaoAjuda')

const containerDaAjuda = document.getElementById('containerDaAjuda')
const botaoCartas = document.getElementById('botaoCartas')
const botaoConvidados = document.getElementById('botaoConvidados')
const botaoPlacas = document.getElementById('botaoPlacas')
const botaoPula = document.getElementById('botaoPula')
const botaoCancelar = document.getElementById('botaoCancelar')


let perguntasEmbaralhadas, indiceDaPerguntaAtual, score, resposta, ajudas

var windowHeight = 0
var windowWidth = 0


botaoStart.addEventListener('click', iniciarJogo)
botaoRegras.addEventListener('click', redirecionarParaSiteDeRegras)
botaoConfiguracoes.addEventListener('click', abrirConfiguracoes)

botaoProximo.addEventListener('click', passarParaProximaPergunta)
botaoAjuda.addEventListener('click', acionarAjuda)
 
botaoCartas.addEventListener('click', abrirCartas) 
botaoConvidados.addEventListener('click', pedirAjudaConvidados)
botaoPlacas.addEventListener('click', olharPlacas)
botaoPula.addEventListener('click', pularPergunta) 
botaoCancelar.addEventListener('click', fecharContainerAjuda)

function getTamanhoDaJanela(){
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
}

function iniciarJogo(){
    // esconde os botões
    botaoStart.classList.add('hidden')
    botaoRegras.classList.add('hidden')
    botaoConfiguracoes.classList.add('hidden')
    // mostra os textos
    textoDaPergunta.classList.remove('hidden')
    displayScore.classList.remove('hidden')
    botaoAjuda.classList.remove('hidden')
    containerDaPergunta.classList.remove('hidden')
    mostrarBotoesAlternativas()
    // embaralha as perguntas
    perguntasEmbaralhadas = perguntas.sort(() => Math.random() - .5)
    // seta o índice da pergunta e o score para 0
    //  cartas, convidados, placas, pula
    ajudas = [true, true, true, 3]
    indiceDaPerguntaAtual = 0
    score = 0
    numeroDePerguntas = perguntasEmbaralhadas.length
    setProximaPergunta()
}

function setProximaPergunta(){
    resetStatus()
    // seleciona a pergunta
    mostrarPergunta(perguntasEmbaralhadas[indiceDaPerguntaAtual])
    displayScore.innerText ='PONTUAÇÃO: ' + score
    resposta = perguntasEmbaralhadas[indiceDaPerguntaAtual].alternativa1

    let numeroAleatorio = Math.floor((Math.random() * 3) + 2)
    if (numeroAleatorio === 2) {
        respostaErradaAleatoria = perguntasEmbaralhadas[indiceDaPerguntaAtual].alternativa2
    }
    else if (numeroAleatorio === 3) {
        respostaErradaAleatoria = perguntasEmbaralhadas[indiceDaPerguntaAtual].alternativa3
    }
    else if (numeroAleatorio === 4) {
        respostaErradaAleatoria = perguntasEmbaralhadas[indiceDaPerguntaAtual].alternativa4
    }

    mostrarBotoesAlternativas()
}

function resetStatus(){
    botaoProximo.classList.add('hidden')
    while (elementoDosBotoesDeResposta.firstChild){
        elementoDosBotoesDeResposta.removeChild(elementoDosBotoesDeResposta.firstChild)
    }
}

function mostrarPergunta(pergunta){
    textoDaPergunta.innerText = pergunta.comando

    posicionamento = Math.floor(Math.random() * 4)

    if (posicionamento == 0){
        setBotao1(pergunta)
        setBotao2(pergunta)
        setBotao3(pergunta)
        setBotao4(pergunta)
    }

    if (posicionamento == 1){
        setBotao2(pergunta)
        setBotao1(pergunta)
        setBotao3(pergunta)
        setBotao4(pergunta)
    }

    if (posicionamento == 2){
        setBotao2(pergunta)
        setBotao3(pergunta)
        setBotao1(pergunta)
        setBotao4(pergunta)
    }

    if (posicionamento == 3){
        setBotao2(pergunta)
        setBotao3(pergunta)
        setBotao4(pergunta)
        setBotao1(pergunta)
    }
    
}

function selecionarResposta(e){
    const botaoSelecionado = e.target
    let acertou

    // verifica se acertou
    if(botaoSelecionado.innerText === resposta){
        //fluxo para acerto
        acertou = true
        textoDaPergunta.innerText = 'ACERTOU!'
        ocultarBotoesAlternativas()
        score += 1

    } else {
        //fluxo para erro
        acertou = false
        textoDaPergunta.innerText = 'GAME OVER!'
        botaoStart.innerText = 'Reiniciar'
        botaoStart.classList.remove('hidden')
        botaoProximo.classList.add('hidden')
        botaoAjuda.classList.add('hidden')
        ocultarBotoesAlternativas()
    }

    // verifica se terminou
    if (numeroDePerguntas > indiceDaPerguntaAtual + 1 && acertou == true) {
        //fluxo se não terminou
        botaoProximo.classList.remove('hidden')
    } else {
        //fluxo se terminou
        botaoStart.innerText = 'Reiniciar'
        botaoProximo.classList.add('hidden')
        botaoStart.classList.remove('hidden')
    }
}

function ocultarBotoesAlternativas(){
    botao1.classList.add('hidden')
    botao2.classList.add('hidden')
    botao3.classList.add('hidden')
    botao4.classList.add('hidden')
}

function mostrarBotoesAlternativas(){
    botao1.classList.remove('hidden')
    botao2.classList.remove('hidden')
    botao3.classList.remove('hidden')
    botao4.classList.remove('hidden')
}

function setBotao1(pergunta){
    botao1.innerText = pergunta.alternativa1
    botao1.classList.add('botao')
    botao1.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao1)
}

function setBotao2(pergunta){
    botao2.innerText = pergunta.alternativa2
    botao2.classList.add('botao')
    botao2.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao2)
}

function setBotao3(pergunta){
    botao3.innerText = pergunta.alternativa3
    botao3.classList.add('botao')
    botao3.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao3)
}

function setBotao4(pergunta){
    botao4.innerText = pergunta.alternativa4
    botao4.classList.add('botao')
    botao4.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao4)
}

function acionarAjuda(){
    containerDaAjuda.classList.remove('hidden')
}

function redirecionarParaSiteDeRegras(){
    window.location.href = "regras.php";
}

function abrirConfiguracoes(){
    console.log('FINGE QUE AS CONFIGURAÇÕES ABRIRAM')
}

function passarParaProximaPergunta(){
    indiceDaPerguntaAtual++
    setProximaPergunta()
}

function fecharContainerAjuda(){
    containerDaAjuda.classList.add('hidden')
}

function pularPergunta(){
    if (ajudas[3] > 0) {
        if (numeroDePerguntas > indiceDaPerguntaAtual + 1) {
            passarParaProximaPergunta()
            containerDaAjuda.classList.add('hidden')
            ajudas[3] -= 1
        } else {
            console.log('Impossível pular pergunta!')
        }
    } else {
        console.log('Você já utilizou todos os pulos!')
    }
}

function abrirCartas() {
    if (ajudas[0] === true) {
        cartaAberta = Math.floor((Math.random() * 3) + 1)
        console.log('Carta aberta! Mate ' + cartaAberta + ' alternativas erradas!')
        if (cartaAberta === 1 ) {
            botao2.classList.add('hidden')
        } else if (cartaAberta === 2 ) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
        } else if (cartaAberta === 3) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
        }
        ajudas[0] = false
    } else {
        console.log('Ajuda já utilizada!')
    }
}

function pedirAjudaConvidados(){
    if (ajudas[1] === true) {
        let chance = Math.floor((Math.random() * 100))
        if (chance > 10){
            console.log(`2 dos 3 convidados disseram que a alternativa correta é ${resposta}.`)
            ajudas[1] = false
        }
        else {
            console.log(`2 dos 3 convidados disseram que a alternativa correta é ${respostaErradaAleatoria}.`)
            ajudas[1] = false
        }
    } else {
        console.log('Ajuda já utilizada!')
    }
}

function olharPlacas(){
    if (ajudas[2] === true){
        let porcentagemExibida = Math.floor((Math.random() * 50) + 50)
        console.log(`${porcentagemExibida}% da plateia disse que a alternativa correta é ${resposta}.`)
        ajudas[2] = false
    } else {
        console.log('Ajuda já utilizada!')
    }
}