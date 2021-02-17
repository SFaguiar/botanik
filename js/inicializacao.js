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
const botaoSala = document.getElementById('botaoSala')
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

const containerConfirmacaoAjuda = document.getElementById('c-ajuda')
const botaoConfirmarAjuda = document.getElementById('c-ajuda-confirmar')
const botaoNegarAjuda = document.getElementById('c-ajuda-negar')
const botaoFecharContainerConfirmacaoAjuda = document.getElementById('c-ajuda-fechar')

const telaGameOver = document.getElementById('telaGameOver')
const gameOverReiniciar = document.getElementById('gameOverReiniciar')

/* --- AJUDAS --- */
const containerDaImagem = document.getElementById('containerDaImagem')
const botaoCartas = document.getElementById('botaoCartas')
const botaoPlacas = document.getElementById('botaoPlacas')
const botaoPula = document.getElementById('botaoPula')
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

/* --- AUDIO ---*/
var somCorreto = new Audio("sons/certo.wav")
var somErrado = new Audio("sons/errado.wav")
var somAjuda = new Audio("sons/ajuda.wav")
var somIniciar = new Audio("sons/start.wav")

// Criação e definição de variáveis globais:
let ajudas, ajudaSelecionada, botaoSelecionado, indiceDaPerguntaAtual, nivelAtual, perguntaAtual, perguntaAtualTemImagem, perguntasEmbaralhadas, resposta, score, intAle1a3
let jaAbriuACarta = false
let confirmado = false
