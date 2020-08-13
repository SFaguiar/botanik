const menuPrincipal = document.getElementById('menuPrincipal')
const menuConfiguracoes = document.getElementById('menuConfiguracoes')
const jogo = document.getElementById('jogo')
const titulo = document.getElementById('titulo')
const botaoStart = document.getElementById('botaoStart')
const botaoRegras = document.getElementById('botaoRegras')
const botaoConfiguracoes = document.getElementById('botaoConfiguracoes')

const botaoSalaDeAula = document.getElementById('botaoSalaDeAula')
const botaoSozinho = document.getElementById('botaoSozinho')
const sairMenuConfiguracoes = document.getElementById('voltarAoMenuPrincipal')

const containerDaPergunta = document.getElementById('containerDaPergunta')
const displayScore = document.getElementById('score')
const textoDaPergunta = document.getElementById('pergunta')
const elementoDosBotoesDeResposta = document.getElementById('botoesReposta')
const botao1 = document.getElementById('botaoAlternativa1')
const botao2 = document.getElementById('botaoAlternativa2')
const botao3 = document.getElementById('botaoAlternativa3')
const botao4 = document.getElementById('botaoAlternativa4')
const botaoProximo = document.getElementById('botaoProximo')
const botaoImagem = document.getElementById('botaoImagem')
const botaoAjuda = document.getElementById('botaoAjuda')
const botaoReiniciar = document.getElementById('botaoReiniciar')

const containerDaAjuda = document.getElementById('containerDaAjuda')
const containerDaImagem = document.getElementById('containerDaImagem')
const botaoCartas = document.getElementById('botaoCartas')
const botaoConvidados = document.getElementById('botaoConvidados')
const botaoPlacas = document.getElementById('botaoPlacas')
const botaoPula = document.getElementById('botaoPula')
const botaoCancelar = document.getElementById('botaoCancelar')
const botaoFecharImagem = document.getElementById('botaoFecharImagem')

let perguntasEmbaralhadas, indiceDaPerguntaAtual, score, resposta, ajudas, nivelAtual

var windowHeight = 0
var windowWidth = 0


botaoStart.addEventListener('click', iniciarJogo)
botaoRegras.addEventListener('click', redirecionarParaSiteDeRegras)
botaoConfiguracoes.addEventListener('click', abrirConfiguracoes)

sairMenuConfiguracoes.addEventListener('click', fecharConfiguracoes)

botaoProximo.addEventListener('click', passarParaProximaPergunta)
botaoAjuda.addEventListener('click', abrirContainerAjuda)
botaoImagem.addEventListener('click', abrirContainerImagem)
botaoReiniciar.addEventListener('click', iniciarJogo)
 
botaoCartas.addEventListener('click', abrirCartas) 
botaoConvidados.addEventListener('click', pedirAjudaConvidados)
botaoPlacas.addEventListener('click', olharPlacas)
botaoPula.addEventListener('click', pularPergunta) 
botaoCancelar.addEventListener('click', fecharContainerAjuda)
botaoFecharImagem.addEventListener('click', fecharContainerImagem)


function iniciarJogo(){
    // esconde os botões
    menuPrincipal.classList.add('hidden')
    // mostra os textos
    jogo.classList.remove('hidden')
    destravarTodasAjudas()
    mostrarBotoesAlternativas()
    botaoReiniciar.classList.add('hidden')
    // embaralha as perguntas
    perguntasEmbaralhadas = []
    perguntasEmbaralhadas[1] = perguntas[1].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[2] = perguntas[2].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[3] = perguntas[3].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[4] = perguntas[4].sort(() => Math.random() - .5)
    // seta o índice da pergunta e o score para 0
    //  cartas, convidados, placas, pula
    ajudas = [true, true, true, 3]
    indiceDaPerguntaAtual = 0
    score = 0
    nivelAtual = 0
    numeroDePerguntas = 30
    setProximaPergunta()
}

function calcularNivel(indiceDaPerguntaAtual){
    if (indiceDaPerguntaAtual >= 0 && indiceDaPerguntaAtual <= 9){
        return 1
    } else if (indiceDaPerguntaAtual >= 10 && indiceDaPerguntaAtual <= 19){
        return 2
    } else if (indiceDaPerguntaAtual >= 20 && indiceDaPerguntaAtual <= 29){
        return 3
    } else if (indiceDaPerguntaAtual >= 30){
        return 4
    } else {
        return 0
    }
}

function setProximaPergunta(){
    resetStatus()
    nivelAtual = calcularNivel(indiceDaPerguntaAtual)
    // seleciona a pergunta
    mostrarPergunta(perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual])
    displayScore.innerText ='PONTUAÇÃO: ' + score
    perguntaAtual = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual]
    resposta = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa1

    let numeroAleatorio = Math.floor((Math.random() * 3) + 2)
    if (numeroAleatorio === 2) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa2
    }
    else if (numeroAleatorio === 3) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa3
    }
    else if (numeroAleatorio === 4) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa4
    }
    mostrarBotoesAlternativas()
    if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != "") {
        botaoImagem.classList.remove('hidden')
        if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
            document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
        }
    } 
}

function resetStatus(){
    botaoProximo.classList.add('hidden')
    while (elementoDosBotoesDeResposta.firstChild){
        elementoDosBotoesDeResposta.removeChild(elementoDosBotoesDeResposta.firstChild)
    }
    botaoAjuda.classList.remove('hidden')
    displayScore.classList.remove('hidden')
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
        setBotao4(pergunta)
        setBotao3(pergunta)
        setBotao2(pergunta)
        setBotao1(pergunta)
    }

    if (posicionamento == 2){
        setBotao3(pergunta)
        setBotao4(pergunta)
        setBotao1(pergunta)
        setBotao2(pergunta)
    }

    if (posicionamento == 3){
        setBotao2(pergunta)
        setBotao1(pergunta)
        setBotao4(pergunta)
        setBotao3(pergunta)
    }
    
}

function selecionarResposta(e){
    const botaoSelecionado = e.target
    let acertou

    // verifica se acertou
    if(botaoSelecionado.innerText === resposta){
        //fluxo para acerto
        acertou = true
        textoDaPergunta.innerHTML = 'ACERTOU! <br>'
        displayScore.classList.add('hidden')
        botaoAjuda.classList.add('hidden')
        if (botaoImagem.classList.contains('hidden') != false) {
            botaoImagem.classList.add('hidden')
        }
        botaoImagem.classList.add('hidden')
        ocultarBotoesAlternativas()
        score += 1

    } else {
        //fluxo para erro
        acertou = false
        textoDaPergunta.innerHTML = 'GAME OVER! PONTUAÇÃO FINAL: ' + score
        displayScore.classList.add('hidden')
        botaoReiniciar.classList.remove('hidden')
        botaoProximo.classList.add('hidden')
        if (botaoImagem.classList.contains('hidden') != false) {
            botaoImagem.classList.add('hidden')
        }
        botaoAjuda.classList.add('hidden')
        ocultarBotoesAlternativas()
    }

    // verifica se terminou
    if (numeroDePerguntas > indiceDaPerguntaAtual + 1 && acertou == true) {
        //fluxo se não terminou
        botaoProximo.classList.remove('hidden')
    } else {
        //fluxo se terminou
        botaoProximo.classList.add('hidden')
        botaoReiniciar.classList.remove('hidden')
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

function mostrarPulosRestantes(){
    if (ajudas[3] > 0) {
        document.getElementById("pulosRestantes").innerHTML = `<b>Você ainda tem ${ajudas[3]} pulos.</b>`
    } else {
        document.getElementById("pulosRestantes").innerHTML = `<b>Não há mais pulos restantes.</b>`
    }
}

function setBotao1(pergunta){
    botao1.innerText = pergunta.alternativa1
    botao1.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao1)
}

function setBotao2(pergunta){
    botao2.innerText = pergunta.alternativa2
    botao2.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao2)
}

function setBotao3(pergunta){
    botao3.innerText = pergunta.alternativa3
    botao3.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao3)
}

function setBotao4(pergunta){
    botao4.innerText = pergunta.alternativa4
    botao4.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao4)
}




function redirecionarParaSiteDeRegras(){
    /* TO DO
        ADICIONAR SITE DAS REGRAS
    */
    window.location.href = "regras.php";
}

function abrirConfiguracoes(){
   menuPrincipal.classList.add('hidden')
   menuConfiguracoes.classList.remove('hidden')
}

function fecharConfiguracoes(){
   menuPrincipal.classList.remove('hidden')
   menuConfiguracoes.classList.add('hidden')
}

function passarParaProximaPergunta(){
    indiceDaPerguntaAtual++
    setProximaPergunta()
}

function fecharContainerAjuda(){
    containerDaAjuda.classList.add('hidden')
}

function abrirContainerAjuda(){
    containerDaAjuda.classList.remove('hidden')
    mostrarPulosRestantes()
}

function abrirContainerImagem(){
    containerDaImagem.classList.remove('hidden')    
}

function fecharContainerImagem(){
    containerDaImagem.classList.add('hidden')
}

function pularPergunta(){
    if (ajudas[3] > 0) {
        if (numeroDePerguntas > indiceDaPerguntaAtual + 1) {
            passarParaProximaPergunta()
            containerDaAjuda.classList.add('hidden')
            ajudas[3] -= 1
            if (ajudas[3] === 0){
                travarBotao(botaoPula)
            }
        }
    }
}

function abrirCartas() {
    if (ajudas[0] === true) {
        cartaAberta = Math.floor((Math.random() * 3) + 1)
        console.log('Carta aberta! Mate ' + cartaAberta + ' alternativas erradas!')
        /* TO DO
            ADICIONAR ESPAÇO PARA ESCOLHER A CARTA
        */
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
        travarBotao(botaoCartas)
    }
}

function pedirAjudaConvidados(){
    if (ajudas[1] === true) {
        let chance = Math.floor((Math.random() * 100))
        if (chance > 10){
            /* TO DO
                ADICIONAR IMAGEM DOS CONVIDADOS
            */
            console.log(`2 dos 3 convidados disseram que a alternativa correta é ${resposta}.`)
            ajudas[1] = false
            travarBotao(botaoConvidados)
        } else {
            /* TO DO
                ADICIONAR IMAGEM DOS CONVIDADOS
            */
            console.log(`2 dos 3 convidados disseram que a alternativa correta é ${respostaErradaAleatoria}.`)
            ajudas[1] = false
            travarBotao(botaoConvidados)
        }
    }
}

function olharPlacas(){
    if (ajudas[2] === true){
        let porcentagemExibida = Math.floor((Math.random() * 50) + 50)
        /* TO DO
            ADICIONAR IMAGEM DAS PLACAS
        */
        console.log(`${porcentagemExibida}% da plateia disse que a alternativa correta é ${resposta}.`)
        ajudas[2] = false
        travarBotao(botaoPlacas)
    }
}


function travarBotao(botao){
    botao.disabled = true
    botao.classList.remove('btn-dark')
    botao.classList.add('btn-danger')
}

function destravarBotao(botao){
    botao.disabled = false
    botao.classList.add('btn-dark')
    botao.classList.remove('btn-danger')
}

function destravarTodasAjudas(){
    destravarBotao(botaoPula)
    destravarBotao(botaoCartas)
    destravarBotao(botaoConvidados)
    destravarBotao(botaoPlacas)
}

function ABRACADABRA123(){
    botao2.classList.add('hidden')
    botao3.classList.add('hidden')
    botao4.classList.add('hidden')
}