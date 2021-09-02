// Criação de XML HTTP Request para a extração de estatísticas de acertos e erros:
var xhr = new XMLHttpRequest();

// Criação de referências para objetos dos DOM:
/* --- MENU PRINCIPAL --- */
const bgAnimado = document.getElementById('bg-animado')
const menuPrincipal = document.getElementById('menuPrincipal')
const menuConfiguracoes = document.getElementById('menuConfiguracoes')
const jogo = document.getElementById('jogo')
const titulo = document.getElementById('titulo')
const botaoStart = document.getElementById('botaoStart')
const botaoSolo = document.getElementById('botaoSolo')
const botaoRegras = document.getElementById('botaoRegras')


/* --- O JOGO --- */
const displayScore = document.getElementById('score')
const textoDaPergunta = document.getElementById('pergunta')
const elementoDosBotoesDeResposta = document.getElementById('botoesReposta')
const botao1 = document.getElementById('botaoAlternativa1')
const botao2 = document.getElementById('botaoAlternativa2')
const botao3 = document.getElementById('botaoAlternativa3')
const botao4 = document.getElementById('botaoAlternativa4')
const botaoProximo = document.getElementById('botaoProximo')
const botaoReiniciar = document.getElementById('botaoReiniciar')

const containerConfirmacaoAlternativa = document.getElementById('c-alternativa')
const botaoConfirmarAlternativa = document.getElementById('c-alternativa-confirmar')
const botaoNegarAlternativa = document.getElementById('c-alternativa-negar')
const botaoFecharContainerConfirmacaoAlternativa = document.getElementById('c-alternativa-fechar')

const containerConfirmacaoAjuda = document.getElementById('c-ajuda')
const botaoConfirmarAjuda = document.getElementById('c-ajuda-confirmar')
const botaoNegarAjuda = document.getElementById('c-ajuda-negar')
const botaoFecharContainerConfirmacaoAjuda = document.getElementById('c-ajuda-fechar')

/* --- AJUDAS --- */
const containerDaImagem = document.getElementById('containerDaImagem')
const botaoCartas = document.getElementById('botaoCartas')
const botaoPlacas = document.getElementById('botaoPlacas')
const botaoPula = document.getElementById('botaoPula')
const botaoConvidados = document.getElementById('botaoConvidados')
const botaoCancelar = document.getElementById('botaoCancelar')
const botaoFecharImagem = document.getElementById('botaoFecharImagem')
const caixaCartaVirada1 = document.getElementById('caixaCartaVirada1')
const caixaCartaVirada2 = document.getElementById('caixaCartaVirada2')
const caixaCartaVirada3 = document.getElementById('caixaCartaVirada3')
const caixaCartaVirada4 = document.getElementById('caixaCartaVirada4')

const cartas = document.getElementById('quatro-cartas')
const card1 = document.getElementById('card1')
const card2 = document.getElementById('card2')
const card3 = document.getElementById('card3')
const card4 = document.getElementById('card4')





// Criação e definição de variáveis globais:
let ajudas, ajudaSelecionada, botaoSelecionado, indiceDaPerguntaAtual, nivelAtual, perguntaAtual, perguntaAtualTemImagem, perguntasEmbaralhadas, resposta, score, intAle1a3
let jaAbriuACarta = false
let confirmado = false

// Atribuição de eventos para botões presentes no jogo:
/* --- MENU PRINCIPAL --- */
botaoStart.addEventListener('click', iniciarJogo)
botaoSolo.addEventListener('click', () => {window.location.href = "index.php"})
botaoRegras.addEventListener('click', () => {window.location.href = "informacoes.php"})

/* --- CONTROLES --- */
botaoProximo.addEventListener('click', passarParaProximaPergunta)
botaoReiniciar.addEventListener('click', iniciarJogo)

botaoConfirmarAlternativa.addEventListener('click', confirmarAlternativa)
botaoNegarAlternativa.addEventListener('click', () => {containerConfirmacaoAlternativa.classList.add('hidden')})

botaoConfirmarAjuda.addEventListener('click', confirmarAjuda)
botaoNegarAjuda.addEventListener('click', () => {containerConfirmacaoAjuda.classList.add('hidden')})
 
/* --- AJUDAS --- */
botaoCartas.addEventListener('click', acionarAjuda) 
botaoConvidados.addEventListener('click', acionarAjuda)
botaoPlacas.addEventListener('click', acionarAjuda)
botaoPula.addEventListener('click', acionarAjuda)

card1.addEventListener('click', esconderCartasRestantes)
card2.addEventListener('click', esconderCartasRestantes)
card3.addEventListener('click', esconderCartasRestantes)
card4.addEventListener('click', esconderCartasRestantes)

document.querySelectorAll('.botao-matar-alternativas').forEach(item => {
    item.addEventListener('click', abrirCartas)
})

// Funções do jogo:
function iniciarJogo(){
    menuPrincipal.classList.add('hidden')
    bgAnimado.style.animationPlayState='paused'
    jogo.classList.remove('hidden')
    botaoReiniciar.classList.add('hidden')
    removerImagem()
    destravarTodasAjudas()
    resetarCoresAlternativas()
    manipularBotoes('todosMenosControles', 'mostrar')

    // Embaralhamento de perguntas:
    perguntasEmbaralhadas = []
    perguntasEmbaralhadas[1] = perguntas[1].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[2] = perguntas[2].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[3] = perguntas[3].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[4] = perguntas[4].sort(() => Math.random() - .5)

    // Reinicialização das variáveis globais:
    ajudas = [2, 4, 4, 5] //cartas, convidados, placas, pula, respectivamente.
    indiceDaPerguntaAtual = 0
    score = 0
    nivelAtual = 0
    numeroDePerguntas = 30
    setProximaPergunta()
    contarAjudasRestantes()
}

// Função que calcula o nível atual do jogador baseado em sua pontuação no momento:
function calcularNivel(score){
    if (score >= 0 && score <= 9){
        return 1
    } else if (score >= 10 && score <= 19){
        return 2
    } else if (score >= 20 && score <= 29){
        return 3
    } else if (score >= 30){
        return 4
    } else {
        return 0
    }
}

// Função que prepara e exibe uma nova pergunta:
function setProximaPergunta(){
    resetStatus()
    destravarAjudas()
    nivelAtual = calcularNivel(score)
    // seleciona a pergunta
    mostrarPergunta(perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual])
    displayScore.innerText =' NIVEL: ' + nivelAtual + ' PONTUAÇÃO: ' + score

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
    manipularBotoes('todosMenosControles', 'mostrar')
    if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != "") {
        if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
            document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
            perguntaAtualTemImagem = true
        }
    } 
}

function resetStatus(){
    botaoProximo.classList.add('hidden')
    while (elementoDosBotoesDeResposta.firstChild){
        elementoDosBotoesDeResposta.removeChild(elementoDosBotoesDeResposta.firstChild)
    }
    displayScore.classList.remove('hidden')
}

// Função que mostra, graficamente, uma nova pergunta:
function mostrarPergunta(pergunta){
    resetarCoresAlternativas()
    textoDaPergunta.innerText = pergunta.comando
    posicionamento = Math.floor(Math.random() * 4)
    if (posicionamento === 0){
        setBotao(botao1, pergunta, 1)
        setBotao(botao2, pergunta, 2)
        setBotao(botao3, pergunta, 3)
        setBotao(botao4, pergunta, 4)
    } else if (posicionamento === 1){
        setBotao(botao4, pergunta, 4)
        setBotao(botao3, pergunta, 3)
        setBotao(botao2, pergunta, 2)
        setBotao(botao1, pergunta, 1)
    } else if (posicionamento === 2){
        setBotao(botao3, pergunta, 3)
        setBotao(botao4, pergunta, 4)
        setBotao(botao1, pergunta, 1)
        setBotao(botao2, pergunta, 2)
    } else if (posicionamento === 3) {
        setBotao(botao2, pergunta, 2)
        setBotao(botao4, pergunta, 4)
        setBotao(botao3, pergunta, 3)
        setBotao(botao1, pergunta, 1)
    }

    if (nivelAtual === 1) {
        document.body.style.backgroundImage = "url('imagens/background.png')"
    } else if (nivelAtual === 2) {
        document.body.style.backgroundImage = "url('imagens/background - verao.png')"
    } else if (nivelAtual === 3) {
        document.body.style.backgroundImage = "url('imagens/background - outono.png')"
    } else if (nivelAtual === 4) {
        document.body.style.backgroundImage = "url('imagens/background - inverno.png')"
    }
}

// Função que é acionada após a confirmação de alternativa:
function confirmarAlternativa(){
    let acertou

    // Modificações na exibição:
    mudarCoresAlternativas()
    travarAjudas()

    // Envio de dados:
    let id = perguntaAtual.id;
    let escolha;   
    switch (botaoSelecionado.innerText) {
        case perguntaAtual.alternativa1:
            escolha = "a";
            break;
        case perguntaAtual.alternativa2:
            escolha = "b";
            break;
        case perguntaAtual.alternativa3:
            escolha = "c";
            break;
        case perguntaAtual.alternativa4:
            escolha = "d";
            break;
    }

    xhr.open("POST", "enviar_estatistica.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id="+id+"&escolha="+escolha);

    // Modificações na exibição:
    mudarCoresAlternativas()
    travarAjudas()

    // Verifica se acertou:
    if (botaoSelecionado.innerText === resposta){
        /* --- FLUXO PARA ACERTO --- */
        // Modificações nas variáveis globais:
        score += 1
        acertou = true
    } else {
        /* --- FLUXO PARA ERRO --- */
        // Modificações nas variáveis globais:
        acertou = false
    }

    /* --- VERIFICAÇÃO DE FIM DE JOGO --- */
    if (numeroDePerguntas > indiceDaPerguntaAtual + 1 && acertou == true) {
        // Se o jogo ainda não terminou:
        botaoProximo.classList.remove('hidden')
    } else {
        // Se o jogo terminou:
        /* FINALIZAÇÃO DO JOGO */
        botaoProximo.classList.add('hidden')
        botaoReiniciar.classList.remove('hidden')
    }

    // Mostra a caixa de confirmação de alternativa:
    document.getElementById('c-alternativa').classList.add('hidden')
}

function confirmarAjuda(){
    if(ajudaSelecionada === 'botaoCartas'){
        cartas.classList.remove('hidden')
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoConvidados'){
        pedirAjudaConvidados()
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPlacas'){
        olharPlacas()
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPula'){
        pularPergunta()
        containerConfirmacaoAjuda.classList.add('hidden')
    }
}

// Função que colore as alternativas após a confirmação da seleção:
function mudarCoresAlternativas(){
    botao1.style.backgroundColor = '#00CC00'
    botao2.style.backgroundColor = '#CC0000'
    botao3.style.backgroundColor = '#CC0000'
    botao4.style.backgroundColor = '#CC0000'

    botao1.disabled = true
    botao2.disabled = true
    botao3.disabled = true
    botao4.disabled = true
}

// Função que descolore as alternativas após uma nova questão ser exibida:
function resetarCoresAlternativas(){
    botao1.style.backgroundColor = '#778899'
    botao2.style.backgroundColor = '#778899'
    botao3.style.backgroundColor = '#778899'
    botao4.style.backgroundColor = '#778899'

    botao1.disabled = false
    botao2.disabled = false
    botao3.disabled = false
    botao4.disabled = false
}

function travarAjudas(){
    botaoCartas.disabled = true
    botaoConvidados.disabled = true
    botaoPlacas.disabled = true
    botaoPula.disabled = true
}

function destravarAjudas(){
    if (ajudas[0] > 0) {botaoCartas.disabled = false}
    if (ajudas[1] > 0) {botaoConvidados.disabled = false}
    if (ajudas[2] > 0) {botaoPlacas.disabled = false}
    if (ajudas[3] > 0) {botaoPula.disabled = false}
}

function selecionarResposta(e){
    botaoSelecionado = e.target
    document.getElementById('c-alternativa').classList.remove('hidden')
}

function manipularBotoes(classe, acao){
    if (acao === 'mostrar'){
        if (classe === 'alternativas'){
            botao1.classList.remove('hidden')
            botao2.classList.remove('hidden')
            botao3.classList.remove('hidden')
            botao4.classList.remove('hidden')
        } else if (classe === 'ajudas') {
            botaoCartas.classList.remove('hidden')
            botaoPlacas.classList.remove('hidden')
            botaoPula.classList.remove('hidden')
        } else if (classe === 'todosMenosControles'){
            botao1.classList.remove('hidden')
            botao2.classList.remove('hidden')
            botao3.classList.remove('hidden')
            botao4.classList.remove('hidden')
            botaoCartas.classList.remove('hidden')
            botaoConvidados.classList.remove('hidden')
            botaoPlacas.classList.remove('hidden')
            botaoPula.classList.remove('hidden')
        }
    } else if (acao === 'ocultar') {
        if (classe === 'alternativas'){
            botao1.classList.add('hidden')
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
        } else if (classe === 'ajudas') {
            botaoCartas.classList.add('hidden')
            botaoConvidados.classList.add('hidden')
            botaoPlacas.classList.add('hidden')
            botaoPula.classList.add('hidden')
        } else if (classe === 'todosMenosControles'){
            botao1.classList.add('hidden')
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
            botaoCartas.classList.add('hidden')
            botaoConvidados.classList.add('hidden')
            botaoPlacas.classList.add('hidden')
            botaoPula.classList.add('hidden')
        }
    }
}

function setBotao(botao, pergunta, alternativa){
    if (alternativa === 1){
        botao.innerText = pergunta.alternativa1
    } else if (alternativa === 2){
        botao.innerText = pergunta.alternativa2
    } else if (alternativa === 3){
        botao.innerText = pergunta.alternativa3
    } else if (alternativa === 4){
        botao.innerText = pergunta.alternativa4
    } else {
        botao.innerText = 'Erro. '
    }
    botao.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao)
}

function removerImagem(){
    // Se a pergunta respondida anteriormente tem uma imagem:
    if (perguntaAtualTemImagem){
        document.getElementById('img' + perguntaAtual.id).classList.add('hidden')
        perguntaAtualTemImagem = false
    }
}

function passarParaProximaPergunta(){
    removerImagem()
    indiceDaPerguntaAtual++
    setProximaPergunta()
}

function pularPergunta(){
    if ((ajudas[3] > 0) && (31 > score)) {
            document.getElementById('container-principal-ajuda-pulo').classList.remove('hidden')
            passarParaProximaPergunta()
            ajudas[3] -= 1
            if (ajudas[3] === 0){
                travarBotao(botaoPula)
            }
        contarAjudasRestantes()
    }
}

function acionarAjuda(e){
    ajudaSelecionada = e.target.id
    document.getElementById('c-ajuda').classList.remove('hidden')
}

function contarAjudasRestantes(){
    document.getElementById('botaoCartas').innerText ='(' + ajudas[0] + 'x) Utilizar cartas'
    document.getElementById('botaoConvidados').innerText = '(' + ajudas[1] + 'x) Perguntar ao professor'
    document.getElementById('botaoPlacas').innerText = '(' + ajudas[2] + 'x) Perguntar aos colegas'
    document.getElementById('botaoPula').innerText = '(' + ajudas[3] + 'x) Pular pergunta'
}

function abrirCartas() {
    if (ajudas[0] > 0) {
        cartaAberta = intAle1a3
        console.log('Carta aberta! Eliminada(s) ' + cartaAberta + ' alternativa(s) errada(s)!')
        if (cartaAberta === 1) {
            botao2.classList.add('hidden')
        } else if (cartaAberta === 2) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
        } else if (cartaAberta === 3) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
        }
        ajudas[0]--
        if (ajudas[0] === 0){
            travarBotao(botaoCartas)
        }
        cartas.classList.add('hidden')
        caixaCartaVirada1.checked = false;
        caixaCartaVirada2.checked = false;
        caixaCartaVirada3.checked = false;
        caixaCartaVirada4.checked = false;
        card1.classList.remove('hidden')
        card2.classList.remove('hidden')
        card3.classList.remove('hidden')
        card4.classList.remove('hidden')
        contarAjudasRestantes()

        for(i=1;i<=4;i++){
            document.getElementById('tituloCarta'+i).innerText = "REMOVER ALTERNATIVA(S)"
        }
    }
    jaAbriuACarta = false
}

// Convidados === Professor.
function pedirAjudaConvidados(){
    if (ajudas[1] > 0) {
        document.getElementById('container-principal-ajuda-professor').classList.remove('hidden')
        ajudas[1]--
        if (ajudas[1] === 0){
            travarBotao(botaoConvidados)
        }
    } 
    contarAjudasRestantes()
}

function esconderCartasRestantes(e){
    idCartaVirada = e.target.id
    if (idCartaVirada === "caixaCartaVirada1"){
        card2.classList.add('hidden')
        card3.classList.add('hidden')
        card4.classList.add('hidden')
        semErro = true
        cartaVirada = 1
    } else if (idCartaVirada === "caixaCartaVirada2"){
        card1.classList.add('hidden')
        card3.classList.add('hidden')
        card4.classList.add('hidden')
        semErro = true
        cartaVirada = 2
    } else if (idCartaVirada === "caixaCartaVirada3"){
        card1.classList.add('hidden')
        card2.classList.add('hidden')
        card4.classList.add('hidden')
        semErro = true
        cartaVirada = 3
    } else if (idCartaVirada === "caixaCartaVirada4"){
        card1.classList.add('hidden')
        card2.classList.add('hidden')
        card3.classList.add('hidden')
        semErro = true
        cartaVirada = 4
    } else {
        semErro = false
    } 

    if(jaAbriuACarta === false){
        intAle1a3 = Math.floor((Math.random() * 3) + 1)
        jaAbriuACarta = true
    }
    
    if (semErro){
        document.getElementById('tituloCarta'+cartaVirada).innerText = "REMOVER " + intAle1a3 + " ALTERNATIVA(S)"
    }
}

// Placas === Dica.
function olharPlacas(){
    if (ajudas[2] > 0){
        document.getElementById('container-principal-ajuda-dica').classList.remove('hidden')
        ajudas[2]--
        if (ajudas[2] === 0){
            travarBotao(botaoPlacas)
        }
        contarAjudasRestantes()
    }
}

function travarBotao(botao){
    botao.disabled = true
    botao.classList.add('btn-danger')
}

function destravarBotao(botao){
    botao.disabled = false
    botao.classList.remove('btn-danger')
}

function destravarTodasAjudas(){
    destravarBotao(botaoPula)
    destravarBotao(botaoCartas)
    destravarBotao(botaoConvidados)
    destravarBotao(botaoPlacas)
}

// TO DO: TRANSFORMAR ESSE COMANDO DA INTERNET EM JAVASCRIPT NATIVO.
$(function() {
    $('.pop').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    });		
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

/* DEBUG */

function DEBUG_SETARQUESTAO(perguntasEmbaralhadas, nivelPergunta, indiceDaPergunta){
    displayScore.innerText ='DEBUG MODE'
    mostrarPergunta(perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta])
    perguntaAtual = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta]
    resposta = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta].alternativa1

    respostaErradaAleatoria = 'DEBUG - SÃO ERRADAS:' + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa2 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa3 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa4
    
    manipularBotoes('todosMenosControles', 'mostrar')
    if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != "") {
        if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
            document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
        }
    } 
}

function DEBUG_MATARALTERNATIVAS(){
    botao2.classList.add('hidden')
    botao3.classList.add('hidden')
    botao4.classList.add('hidden')
}

function DEBUG_AJUDASINFINITAS(){
    ajudas[0] = 1000
    ajudas[1] = 1000
    ajudas[2] = 1000
    ajudas[3] = 1000
}