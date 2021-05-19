
// Funções do jogo:
function iniciarJogo(){
    telaGameOver.classList.add('hidden')
    menuPrincipal.classList.add('hidden')
    jogo.classList.remove('hidden')
    travarBotao(botaoReiniciar)
    travarBotao(botaoProximo)
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
    displayScore.innerHTML =' NÍVEL: ' + nivelAtual +' PONT.: ' + score

    perguntaAtual = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual]
    resposta = perguntaAtual.alternativa1

    let numeroAleatorio = Math.floor((Math.random() * 3) + 2)
    if (numeroAleatorio === 2) {
        respostaErradaAleatoria = perguntaAtual.alternativa2
    }
    else if (numeroAleatorio === 3) {
        respostaErradaAleatoria = perguntaAtual.alternativa3
    }
    else if (numeroAleatorio === 4) {
        respostaErradaAleatoria = perguntaAtual.alternativa4
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
    travarBotao(botaoProximo)
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
        document.body.style.backgroundImage = "url('imagens/background.webp')"
    } else if (nivelAtual === 2) {
        document.body.style.backgroundImage = "url('imagens/background - verao.webp')"
    } else if (nivelAtual === 3) {
        document.body.style.backgroundImage = "url('imagens/background - outono.webp')"
    } else if (nivelAtual === 4) {
        document.body.style.backgroundImage = "url('imagens/background - inverno.webp')"
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

    // Verifica se acertou:
    if (botaoSelecionado.innerText === resposta){
        /* --- FLUXO PARA ACERTO --- */
        //Animação e sons:
        somCorreto.play()

        // Modificações nas variáveis globais:
        score += 1
        acertou = true
    } else {
        /* --- FLUXO PARA ERRO --- */
        //Animação e sons:
        somErrado.play()

        // Modificações nas variáveis globais:
        acertou = false
    }
    
    /* --- VERIFICAÇÃO DE FIM DE JOGO --- */
    if (numeroDePerguntas > indiceDaPerguntaAtual + 1 && acertou == true) {
        // Se o jogo ainda não terminou:
        destravarBotao(botaoProximo)
    } else {
        // Se o jogo terminou:
        /* FINALIZAÇÃO DO JOGO */
        travarBotao(botaoProximo)
        destravarBotao(botaoReiniciar)
    }

    // Mostra a caixa de confirmação de alternativa:
    document.getElementById('c-alternativa').classList.add('hidden')
}

function confirmarAjuda(){
    if(ajudaSelecionada === 'botaoCartas' || ajudaSelecionada === 'icone-cartas' || ajudaSelecionada === 'cartas-restantes') {
        cartas.classList.remove('hidden')
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPlacas' || ajudaSelecionada === 'icone-dicas' || ajudaSelecionada === 'dicas-restantes') {
        olharPlacas()
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPula' || ajudaSelecionada === 'icone-pulo' || ajudaSelecionada === 'pulos-restantes'){
        pularPergunta()
        containerConfirmacaoAjuda.classList.add('hidden')
    } else {
        console.log(ajudaSelecionada)
    }
    somAjuda.play()
}

// Função que colore as alternativas após a confirmação da seleção:
function mudarCoresAlternativas(){
    botao1.style.backgroundColor = '#28a745'
    botao2.style.backgroundColor = '#dc3546'
    botao3.style.backgroundColor = '#dc3546'
    botao4.style.backgroundColor = '#dc3546'

    botao1.disabled = true
    botao2.disabled = true
    botao3.disabled = true
    botao4.disabled = true
}

// Função que descolore as alternativas após uma nova questão ser exibida:
function resetarCoresAlternativas(){
    botao1.style.backgroundColor = ''
    botao2.style.backgroundColor = ''
    botao3.style.backgroundColor = ''
    botao4.style.backgroundColor = ''

    botao1.disabled = false
    botao2.disabled = false
    botao3.disabled = false
    botao4.disabled = false
}

function travarAjudas(){
    botaoCartas.disabled = true
    botaoPlacas.disabled = true
    botaoPula.disabled = true
}

function destravarAjudas(){
    if (ajudas[0] > 0) {botaoCartas.disabled = false}
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
            botaoPlacas.classList.add('hidden')
            botaoPula.classList.add('hidden')
        } else if (classe === 'todosMenosControles'){
            botao1.classList.add('hidden')
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
            botaoCartas.classList.add('hidden')
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

function abrirConfiguracoes(){
   menuPrincipal.classList.add('hidden')
   menuConfiguracoes.classList.remove('hidden')
}

function fecharConfiguracoes(){
   menuPrincipal.classList.remove('hidden')
   menuConfiguracoes.classList.add('hidden')
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
    console.log(ajudaSelecionada)
    document.getElementById('c-ajuda').classList.remove('hidden')
}

function contarAjudasRestantes(){
    document.getElementById('cartas-restantes').innerText =' (' + ajudas[0] + 'x)'
    document.getElementById('dicas-restantes').innerText = ' (' + ajudas[2] + 'x)'
    document.getElementById('pulos-restantes').innerText = ' (' + ajudas[3] + 'x)'
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
    destravarBotao(botaoPlacas)
}

function mostrarTelaGameOver(){
    jogo.classList.add('hidden')
    telaGameOver.classList.remove('hidden')
    document.getElementById('finalScore').innerText = score
    document.getElementById('comandoGameOver').innerText = perguntaAtual.comando
    document.getElementById('respostaCorretaGameOver').innerText = resposta
}

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