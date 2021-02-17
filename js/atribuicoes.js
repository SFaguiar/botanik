// Atribuição de eventos para botões presentes no jogo:
/* --- MENU PRINCIPAL --- */
botaoStart.addEventListener('click', iniciarJogo)
botaoSala.addEventListener('click', () => {window.location.href = "index_sala.php"})
botaoRegras.addEventListener('click', () => {window.location.href = "informacoes.php"})

/* --- CONTROLES --- */
botaoProximo.addEventListener('click', passarParaProximaPergunta)
botaoReiniciar.addEventListener('click', mostrarTelaGameOver)

botaoConfirmarAlternativa.addEventListener('click', confirmarAlternativa)
botaoNegarAlternativa.addEventListener('click', () => {containerConfirmacaoAlternativa.classList.add('hidden')})

botaoConfirmarAjuda.addEventListener('click', confirmarAjuda)
botaoNegarAjuda.addEventListener('click', () => {containerConfirmacaoAjuda.classList.add('hidden')})
 
/* --- AJUDAS --- */
botaoCartas.addEventListener('click', acionarAjuda) 
botaoPlacas.addEventListener('click', acionarAjuda)
botaoPula.addEventListener('click', acionarAjuda)

card1.addEventListener('click', esconderCartasRestantes)
card2.addEventListener('click', esconderCartasRestantes)
card3.addEventListener('click', esconderCartasRestantes)
card4.addEventListener('click', esconderCartasRestantes)

gameOverReiniciar.addEventListener('click', iniciarJogo)

document.querySelectorAll('.botao-matar-alternativas').forEach(item => {
    item.addEventListener('click', abrirCartas)
})
