// Criação de XML HTTP Request para a extração de estatísticas de acertos e erros:
const xhr = new XMLHttpRequest();

// Criação de referências para objetos dos DOM:
const UI = {
  mainMenu: document.getElementById('main-menu'),
  gameArea: document.getElementById('game-area'),
  btnStart: document.getElementById('btn-start'),
  btnRoom: document.getElementById('btn-room'),
  btnRules: document.getElementById('btn-rules'),

  // Game Area
  scoreDisplay: document.getElementById('score'),
  questionText: document.getElementById('question-text'),
  answerButtonsContainer: document.getElementById('answer-buttons'),
  btnNext: document.getElementById('btn-next'),
  btnRestart: document.getElementById('btn-restart'),
  
  // Answer Buttons (created dynamically)
  btnAlt1: document.getElementById('btn-alt-1'),
  btnAlt2: document.getElementById('btn-alt-2'),
  btnAlt3: document.getElementById('btn-alt-3'),
  btnAlt4: document.getElementById('btn-alt-4'),

  // Popups
  confirmAnswerPopup: document.getElementById('confirm-answer-popup'),
  btnConfirmAnswer: document.getElementById('btn-confirm-answer'),
  btnDenyAnswer: document.getElementById('btn-deny-answer'),
  confirmHelpPopup: document.getElementById('confirm-help-popup'),
  btnConfirmHelp: document.getElementById('btn-confirm-help'),
  btnDenyHelp: document.getElementById('btn-deny-help'),
  hintPopup: document.getElementById('hint-popup'),
  skipPopup: document.getElementById('skip-popup'),

  // Game Over
  gameOverScreen: document.getElementById('telaGameOver'),
  finalScore: document.getElementById('final-score'),
  gameOverCommand: document.getElementById('game-over-command'),
  gameOverAnswer: document.getElementById('game-over-answer'),
  btnGameOverRestart: document.getElementById('btn-game-over-restart'),

  // Helps
  helpButtons: document.querySelectorAll('.btn-help'),
  btnCards: document.getElementById('btn-cards'),
  btnHints: document.getElementById('btn-hints'),
  btnSkip: document.getElementById('btn-skip'),
  cardsRemaining: document.getElementById('cards-remaining'),
  hintsRemaining: document.getElementById('hints-remaining'),
  skipsRemaining: document.getElementById('skips-remaining'),

  // Cards
  cardDeck: document.getElementById('card-deck'),
  cards: [
    document.getElementById('card1'),
    document.getElementById('card2'),
    document.getElementById('card3'),
    document.getElementById('card4')
  ],
  cardCheckboxes: [
    document.getElementById('caixaCartaVirada1'),
    document.getElementById('caixaCartaVirada2'),
    document.getElementById('caixaCartaVirada3'),
    document.getElementById('caixaCartaVirada4')
  ],
  cardTitles: document.querySelectorAll('.titulo-carta-frente'),
  killAnswerButtons: document.querySelectorAll('.btn-kill-answer')
};

/* --- AUDIO --- */
const sounds = {
  correct: new Audio('sons/certo.wav'),
  wrong: new Audio('sons/errado.wav'),
  help: new Audio('sons/ajuda.wav')
};

// Criação e definição de variáveis globais:
const gameState = {
  helps: { cards: 0, hints: 0, skips: 0 },
  selectedHelp: null,
  selectedButton: null,
  currentQuestionIndex: 0,
  currentLevel: 0,
  totalQuestions: 30,
  currentQuestion: {},
  hasImage: false,
  shuffledQuestions: [],
  correctAnswer: null,
  score: 0,
  randomInt1to3: 0,
  hasCardBeenOpened: false
};

// Funções do jogo:
function startGame () {
  UI.gameOverScreen.classList.add('hidden');
  UI.mainMenu.classList.add('hidden');
  UI.gameArea.classList.remove('hidden');
  lockButton(UI.btnRestart);
  lockButton(UI.btnNext);
  removeImage();
  unlockAllHelps();
  resetAnswerColors();
  toggleButtons('allButControls', 'show');

  // Embaralhamento de perguntas:
  gameState.shuffledQuestions = [];
  gameState.shuffledQuestions[1] = perguntas[1].sort(() => Math.random() - 0.5);
  gameState.shuffledQuestions[2] = perguntas[2].sort(() => Math.random() - 0.5);
  gameState.shuffledQuestions[3] = perguntas[3].sort(() => Math.random() - 0.5);
  gameState.shuffledQuestions[4] = perguntas[4].sort(() => Math.random() - 0.5);

  // Reinicialização das variáveis globais:
  gameState.helps = { cards: 2, hints: 4, skips: 5 }; // cartas, dicas, pulos
  gameState.currentQuestionIndex = 0;
  gameState.score = 0;
  gameState.currentLevel = 0;
  setNextQuestion();
  updateRemainingHelps();
}

// Função que calcula o nível atual do jogador baseado em sua pontuação no momento:
function calculateLevel (score) {
  if (score >= 0 && score <= 9) {
    return 1
  } else if (score >= 10 && score <= 19) {
    return 2
  } else if (score >= 20 && score <= 29) {
    return 3
  } else if (score >= 30) {
    return 4
  } else {
    return 0
  }
}

// Função que prepara e exibe uma nova pergunta:
function setNextQuestion () {
  resetStatus();
  unlockHelps();
  updateProgressBar();
  gameState.currentLevel = calculateLevel(gameState.score);
  // seleciona a pergunta
  showQuestion(gameState.shuffledQuestions[gameState.currentLevel][gameState.currentQuestionIndex]);

  gameState.currentQuestion = gameState.shuffledQuestions[gameState.currentLevel][gameState.currentQuestionIndex];
  gameState.correctAnswer = gameState.currentQuestion.alternativa1;

  toggleButtons('allButControls', 'show');
  if (gameState.currentQuestion.imagem !== '') {
    const imgElement = document.getElementById('img' + gameState.currentQuestion.id);
    if (imgElement) {
      imgElement.classList.remove('hidden');
      gameState.hasImage = true;
    }
  }
}

function resetStatus () {
  lockButton(UI.btnNext);
  while (UI.answerButtonsContainer.firstChild) {
    UI.answerButtonsContainer.removeChild(UI.answerButtonsContainer.firstChild);
  }
  UI.scoreDisplay.classList.remove('hidden');
}

// Função que mostra, graficamente, uma nova pergunta:
function showQuestion (question) {
  resetAnswerColors();
  UI.questionText.innerText = '[' + question.tipo + '] ' + question.comando;
  
  const alternatives = [
    { text: question.alternativa1, isCorrect: true },
    { text: question.alternativa2, isCorrect: false },
    { text: question.alternativa3, isCorrect: false },
    { text: question.alternativa4, isCorrect: false }
  ].sort(() => Math.random() - 0.5);

  const answerButtons = [UI.btnAlt1, UI.btnAlt2, UI.btnAlt3, UI.btnAlt4];

  alternatives.forEach((alt, index) => {
    const button = answerButtons[index];
    button.innerText = alt.text;
    // Store correctness info on the button itself
    button.dataset.correct = alt.isCorrect;
    button.addEventListener('click', selectAnswer);
    UI.answerButtonsContainer.appendChild(button);
  });
}

// Função que é acionada após a confirmação de alternativa:
function confirmAnswer () {
  let acertou;

  // Modificações na exibição:
  changeAnswerColors();
  lockHelps();

  // Envio de dados:
  let id = gameState.currentQuestion.id;
  let escolha;
  switch (gameState.selectedButton.innerText) {
    case gameState.currentQuestion.alternativa1:
      escolha = 'a';
      break;
    case gameState.currentQuestion.alternativa2:
      escolha = 'b';
      break;
    case gameState.currentQuestion.alternativa3:
      escolha = 'c';
      break;
    case gameState.currentQuestion.alternativa4:
      escolha = 'd';
      break;
  }

  xhr.open('POST', 'enviar_estatistica.php')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send('id='+id+'&escolha='+escolha)

  // Verifica se acertou:
  if (gameState.selectedButton.dataset.correct === "true") {
    /* --- FLUXO PARA ACERTO --- */
    // Animação e sons:
    sounds.correct.play();

    // Modificações nas variáveis globais:
    gameState.score += 1;
    acertou = true;
  } else {
    /* --- FLUXO PARA ERRO --- */
    // Animação e sons:
    sounds.wrong.play();

    // Modificações nas variáveis globais:
    acertou = false;
  }

  /* --- VERIFICAÇÃO DE FIM DE JOGO --- */
  if (gameState.totalQuestions > gameState.currentQuestionIndex + 1 && acertou == true) {
    // Se o jogo ainda não terminou:
    unlockButton(UI.btnNext);
  } else {
    // Se o jogo terminou:
    /* FINALIZAÇÃO DO JOGO */
    lockButton(UI.btnNext);
    unlockButton(UI.btnRestart);
  }

  // Mostra a caixa de confirmação de alternativa:
  UI.confirmAnswerPopup.classList.add('hidden');
}

function confirmHelp () {
  if (gameState.selectedHelp === 'btn-cards') {
    UI.cardDeck.classList.remove('hidden');
  } else if (gameState.selectedHelp === 'btn-hints') {
    useHint();
  } else if (gameState.selectedHelp === 'btn-skip') {
    skipQuestion();
  } else {
    console.log(gameState.selectedHelp);
  }
  UI.confirmHelpPopup.classList.add('hidden');
  sounds.help.play();
}

// Função que colore as alternativas após a confirmação da seleção:
function changeAnswerColors () {
  const answerButtons = UI.answerButtonsContainer.querySelectorAll('.btn-answer');
  answerButtons.forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = '#28a745'; // green
    } else {
      button.style.backgroundColor = '#dc3546'; // red
    }
    button.disabled = true;
  });
}

// Função que descolore as alternativas após uma nova questão ser exibida:
function resetAnswerColors () {
  const answerButtons = UI.answerButtonsContainer.querySelectorAll('.btn-answer');
  const defaultColor = configuracoes ? configuracoes[5].backgroundColor : '';
  answerButtons.forEach(button => {
    button.style.backgroundColor = defaultColor;
    button.disabled = false;
  });
}

// Trava todos os botões de ajuda disponíveis:
function lockHelps () {
  UI.helpButtons.forEach(button => button.disabled = true);
}

function unlockHelps () {
  if (gameState.helps.cards > 0) UI.btnCards.disabled = false;
  if (gameState.helps.hints > 0) UI.btnHints.disabled = false;
  if (gameState.helps.skips > 0) UI.btnSkip.disabled = false;
}

function selectAnswer (e) {
  gameState.selectedButton = e.target;
  UI.confirmAnswerPopup.classList.remove('hidden');
}

function toggleButtons (group, action) {
  const buttonsToShow = [];
  const buttonsToHide = [];
  const allButtons = [UI.btnAlt1, UI.btnAlt2, UI.btnAlt3, UI.btnAlt4, UI.btnCards, UI.btnHints, UI.btnSkip];

  if (group === 'allButControls') {
    if (action === 'show') {
      allButtons.forEach(btn => btn.classList.remove('hidden'));
    } else {
      allButtons.forEach(btn => btn.classList.add('hidden'));
    }
  }
  // Add other groups if needed
}

function removeImage () {
  // Se a pergunta respondida anteriormente tem uma imagem:
  if (gameState.hasImage) {
    const imgElement = document.getElementById('img' + gameState.currentQuestion.id);
    if (imgElement) {
      imgElement.classList.add('hidden');
    }
    gameState.hasImage = false;
  }
}

function goToNextQuestion () {
  removeImage();
  gameState.currentQuestionIndex++;
  setNextQuestion();
}

function skipQuestion () {
  if ((gameState.helps.skips > 0) && (gameState.score < 31)) {
    UI.skipPopup.classList.remove('hidden');
    goToNextQuestion();
    gameState.helps.skips -= 1;
    if (gameState.helps.skips === 0) {
      lockButton(UI.btnSkip);
    }
    updateRemainingHelps();
  }
}

function triggerHelp (e) {
  gameState.selectedHelp = e.currentTarget.id;
  UI.confirmHelpPopup.classList.remove('hidden');
}

function updateRemainingHelps () {
  UI.cardsRemaining.innerText =' (' + gameState.helps.cards + 'x)';
  UI.hintsRemaining.innerText = ' (' + gameState.helps.hints + 'x)';
  UI.skipsRemaining.innerText = ' (' + gameState.helps.skips + 'x)';
}

function openCards () {
  if (gameState.helps.cards > 0) {
    const eliminatedCount = gameState.randomInt1to3;
    console.log('Carta aberta! Eliminada(s) ' + eliminatedCount + ' alternativa(s) errada(s)!');
    
    const answerButtons = Array.from(UI.answerButtonsContainer.querySelectorAll('.btn-answer'));
    const wrongAnswers = answerButtons.filter(btn => btn.dataset.correct !== "true");
    
    for (let i = 0; i < eliminatedCount && i < wrongAnswers.length; i++) {
      wrongAnswers[i].classList.add('hidden');
    }

    gameState.helps.cards--;
    if (gameState.helps.cards === 0) {
      lockButton(UI.btnCards);
    }
    UI.cardDeck.classList.add('hidden');
    UI.cardCheckboxes.forEach(cb => cb.checked = false);
    UI.cards.forEach(card => card.classList.remove('hidden'));
    updateRemainingHelps();

    UI.cardTitles.forEach(title => title.innerText = 'REMOVER ALTERNATIVA(S)');
  }
  gameState.hasCardBeenOpened = false;
}

function hideOtherCards (e) {
  let selectedCardId = e.currentTarget.id;
  let selectedCardIndex = -1;

  UI.cardCheckboxes.forEach((cb, index) => {
    if (cb.id === selectedCardId) {
      selectedCardIndex = index;
    }
  });

  if (selectedCardIndex !== -1) {
    UI.cards.forEach((card, index) => {
      if (index !== selectedCardIndex) {
        card.classList.add('hidden');
      }
    });

    if (gameState.hasCardBeenOpened === false) {
      gameState.randomInt1to3 = Math.floor((Math.random() * 3) + 1);
      gameState.hasCardBeenOpened = true;
    }
    
    UI.cardTitles[selectedCardIndex].innerText = 'REMOVER ' + gameState.randomInt1to3 + ' ALTERNATIVA(S)';
  }
}

// Placas === Dica.
function useHint () {
  if (gameState.helps.hints > 0) {
    UI.hintPopup.classList.remove('hidden');
    gameState.helps.hints--;
    if (gameState.helps.hints === 0) {
      lockButton(UI.btnHints);
    }
    updateRemainingHelps();
  }
}

function lockButton (button) {
  button.disabled = true;
  button.classList.add('btn-danger');
}

function unlockButton (button) {
  button.disabled = false;
  button.classList.remove('btn-danger');
}

function unlockAllHelps () {
  UI.helpButtons.forEach(button => unlockButton(button));
}

function showGameOverScreen () {
  UI.gameArea.classList.add('hidden');
  UI.gameOverScreen.classList.remove('hidden');
  UI.finalScore.innerText = gameState.score;
  UI.gameOverCommand.innerText = gameState.currentQuestion.comando;
  UI.gameOverAnswer.innerText = gameState.correctAnswer;
}

function updateProgressBar () {
  let progress = (gameState.score / gameState.totalQuestions) * 100;
  document.querySelector('.progress-bar div').style.width = progress + '%';
}

$(function () {
  $('.pop').on('click', function () {
    $('.imagepreview').attr('src', $(this).find('img').attr('src'));
    $('#imagemodal').modal('show');
  });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


/* DEBUG */

function DEBUG_SETQUESTION (shuffledQuestions, level, index) {
  UI.scoreDisplay.innerText ='DEBUG MODE';
  showQuestion(shuffledQuestions[level][index]);
  gameState.currentQuestion = shuffledQuestions[level][index];
  gameState.correctAnswer = shuffledQuestions[level][index].alternativa1;

  toggleButtons('allButControls', 'show');
  if (gameState.currentQuestion.imagem !== '') {
    const imgElement = document.getElementById('img' + gameState.currentQuestion.id);
    if (imgElement) {
      imgElement.classList.remove('hidden');
    }
  }
}

function DEBUG_KILLALTERNATIVES () {
  UI.btnAlt2.classList.add('hidden');
  UI.btnAlt3.classList.add('hidden');
  UI.btnAlt4.classList.add('hidden');
}

function DEBUG_INFINITEHELPS () {
  gameState.helps.cards = 1000;
  gameState.helps.hints = 1000;
  gameState.helps.skips = 1000;
}

// Atribuição de eventos para botões presentes no jogo:
/* --- MENU PRINCIPAL --- */
UI.btnStart.addEventListener('click', startGame);
UI.btnRoom.addEventListener('click', () => {window.location.href = 'index_sala.php'});
UI.btnRules.addEventListener('click', () => {window.location.href = 'informacoes.php'});

/* --- CONTROLES --- */
UI.btnNext.addEventListener('click', goToNextQuestion);
UI.btnRestart.addEventListener('click', showGameOverScreen);

UI.btnConfirmAnswer.addEventListener('click', confirmAnswer);
UI.btnDenyAnswer.addEventListener('click', () => { UI.confirmAnswerPopup.classList.add('hidden'); });

UI.btnConfirmHelp.addEventListener('click', confirmHelp);
UI.btnDenyHelp.addEventListener('click', () => { UI.confirmHelpPopup.classList.add('hidden'); });

/* --- AJUDAS --- */
UI.btnCards.addEventListener('click', triggerHelp);
UI.btnHints.addEventListener('click', triggerHelp);
UI.btnSkip.addEventListener('click', triggerHelp);

UI.cards.forEach(card => card.addEventListener('click', hideOtherCards));

UI.btnGameOverRestart.addEventListener('click', startGame);

UI.killAnswerButtons.forEach(item => {
  item.addEventListener('click', openCards);
});

  // Desabilita os botões para não serem clicados após a confirmação:
  for (let i = 0; i < botoesResposta.length; i++) {
    botoesResposta[i].disabled = true
  }

// Função que descolore as alternativas após uma nova questão ser exibida:
function resetarCoresAlternativas () {
  if (configuracoes != null) {
    for (let i = 0; i < botoesResposta.length; i++) {
      botoesResposta[i].style.backgroundColor = configuracoes[5].backgroundColor
    }
  } else {
    for (let i = 0; i < botoesResposta.length; i++) {
      botoesResposta[i].style.backgroundColor = ''
    }
  }

  for (let i = 0; i < botoesResposta.length; i++) {
    botoesResposta[i].disabled = false
  }
}

// Trava todos os botões de ajuda disponíveis:
function travarAjudas () {
  for (let i = 0; i < botoesAjuda.length; i++) {
    botoesAjuda[i].disabled = true
  }
}

function destravarAjudas () {
  if (ajudas[0] > 0) {
    botaoCartas.disabled = false
  }

  if (ajudas[2] > 0) {
    botaoPlacas.disabled = false
  }

  if (ajudas[3] > 0) {
    botaoPula.disabled = false
  }
}

function selecionarResposta (e) {
  botaoSelecionado = e.target
  document.getElementById('c-alternativa').classList.remove('hidden')
}

function manipularBotoes (classe, acao) {
  if (acao === 'mostrar') {
    if (classe === 'alternativas') {
      botao1.classList.remove('hidden')
      botao2.classList.remove('hidden')
      botao3.classList.remove('hidden')
      botao4.classList.remove('hidden')
    } else if (classe === 'ajudas') {
      botaoCartas.classList.remove('hidden')
      botaoPlacas.classList.remove('hidden')
      botaoPula.classList.remove('hidden')
    } else if (classe === 'todosMenosControles') {
      botao1.classList.remove('hidden')
      botao2.classList.remove('hidden')
      botao3.classList.remove('hidden')
      botao4.classList.remove('hidden')
      botaoCartas.classList.remove('hidden')
      botaoPlacas.classList.remove('hidden')
      botaoPula.classList.remove('hidden')
    }
  } else if (acao === 'ocultar') {
    if (classe === 'alternativas') {
      botao1.classList.add('hidden')
      botao2.classList.add('hidden')
      botao3.classList.add('hidden')
      botao4.classList.add('hidden')
    } else if (classe === 'ajudas') {
      botaoCartas.classList.add('hidden')
      botaoPlacas.classList.add('hidden')
      botaoPula.classList.add('hidden')
    } else if (classe === 'todosMenosControles') {
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

function setBotao (botao, pergunta, alternativa) {
  if (alternativa === 1) {
    botao.innerText = pergunta.alternativa1
  } else if (alternativa === 2) {
    botao.innerText = pergunta.alternativa2
  } else if (alternativa === 3) {
    botao.innerText = pergunta.alternativa3
  } else if (alternativa === 4) {
    botao.innerText = pergunta.alternativa4
  } else {
    botao.innerText = 'Erro. '
  }
  botao.addEventListener('click', selecionarResposta)
  elementoDosBotoesDeResposta.appendChild(botao)
}

function removerImagem () {
  // Se a pergunta respondida anteriormente tem uma imagem:
  if (perguntaAtualTemImagem) {
    document.getElementById('img' + perguntaAtual.id).classList.add('hidden')
    perguntaAtualTemImagem = false
  }
}

function passarParaProximaPergunta () {
  removerImagem()
  indiceDaPerguntaAtual++
  setProximaPergunta()
}

function pularPergunta () {
  if ((ajudas[3] > 0) && (score < 31)) {
    document.getElementById('container-principal-ajuda-pulo').classList.remove('hidden')
    passarParaProximaPergunta()
    ajudas[3] -= 1
    if (ajudas[3] === 0) {
      travarBotao(botaoPula)
    }
    contarAjudasRestantes()
  }
}

function acionarAjuda (e) {
  ajudaSelecionada = e.target.id
  console.log(ajudaSelecionada)
  document.getElementById('c-ajuda').classList.remove('hidden')
}

function contarAjudasRestantes () {
  document.getElementById('cartas-restantes').innerText =' (' + ajudas[0] + 'x)'
  document.getElementById('dicas-restantes').innerText = ' (' + ajudas[2] + 'x)'
  document.getElementById('pulos-restantes').innerText = ' (' + ajudas[3] + 'x)'
}

function abrirCartas () {
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
    if (ajudas[0] === 0) {
      travarBotao(botaoCartas)
    }
    cartas.classList.add('hidden')
    caixaCartaVirada1.checked = false
    caixaCartaVirada2.checked = false
    caixaCartaVirada3.checked = false
    caixaCartaVirada4.checked = false
    card1.classList.remove('hidden')
    card2.classList.remove('hidden')
    card3.classList.remove('hidden')
    card4.classList.remove('hidden')
    contarAjudasRestantes()

    for (i=1;i<=4;i++) {
      document.getElementById('tituloCarta'+i).innerText = 'REMOVER ALTERNATIVA(S)'
    }
  }
  jaAbriuACarta = false
}

function esconderCartasRestantes (e) {
  let idCartaVirada = e.target.id
  if (idCartaVirada === 'caixaCartaVirada1') {
    card2.classList.add('hidden')
    card3.classList.add('hidden')
    card4.classList.add('hidden')
    semErro = true
    cartaVirada = 1
  } else if (idCartaVirada === 'caixaCartaVirada2') {
    card1.classList.add('hidden')
    card3.classList.add('hidden')
    card4.classList.add('hidden')
    semErro = true
    cartaVirada = 2
  } else if (idCartaVirada === 'caixaCartaVirada3') {
    card1.classList.add('hidden')
    card2.classList.add('hidden')
    card4.classList.add('hidden')
    semErro = true
    cartaVirada = 3
  } else if (idCartaVirada === 'caixaCartaVirada4') {
    card1.classList.add('hidden')
    card2.classList.add('hidden')
    card3.classList.add('hidden')
    semErro = true
    cartaVirada = 4
  } else {
    semErro = false
  }

  if (jaAbriuACarta === false) {
    intAle1a3 = Math.floor((Math.random() * 3) + 1)
    jaAbriuACarta = true
  }

  if (semErro) {
    document.getElementById('tituloCarta'+cartaVirada).innerText = 'REMOVER ' + intAle1a3 + ' ALTERNATIVA(S)'
  }
}

// Placas === Dica.
function olharPlacas () {
  if (ajudas[2] > 0) {
    document.getElementById('container-principal-ajuda-dica').classList.remove('hidden')
    ajudas[2]--
    if (ajudas[2] === 0) {
      travarBotao(botaoPlacas)
    }
    contarAjudasRestantes()
  }
}

function travarBotao (botao) {
  botao.disabled = true
  botao.classList.add('btn-danger')
}

function destravarBotao (botao) {
  botao.disabled = false
  botao.classList.remove('btn-danger')
}

function destravarTodasAjudas () {
  for (i = 0; i < botoesAjuda.length; i++ ) {
    destravarBotao(botoesAjuda[i])
  }
}

function mostrarTelaGameOver () {
  jogo.classList.add('hidden')
  telaGameOver.classList.remove('hidden')
  document.getElementById('finalScore').innerText = score
  document.getElementById('comandoGameOver').innerText = perguntaAtual.comando
  document.getElementById('respostaCorretaGameOver').innerText = resposta
}

function atualizarBarraProgresso () {
  let progresso = (score/numeroDePerguntas) * 100
  document.querySelector('.progress-bar div').style.width = progresso + '%'
}

$(function () {
  $('.pop').on('click', function () {
    $('.imagepreview').attr('src', $(this).find('img').attr('src'))
    $('#imagemodal').modal('show')
  })
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


/* DEBUG */

function DEBUG_SETARQUESTAO (perguntasEmbaralhadas, nivelPergunta, indiceDaPergunta) {
  displayScore.innerText ='DEBUG MODE'
  mostrarPergunta(perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta])
  perguntaAtual = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta]
  resposta = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta].alternativa1

  respostaErradaAleatoria = 'DEBUG - SÃO ERRADAS:' + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa2 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa3 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa4

  manipularBotoes('todosMenosControles', 'mostrar')
  if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != '') {
    if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
      document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
    }
  }
}

function DEBUG_MATARALTERNATIVAS () {
  botao2.classList.add('hidden')
  botao3.classList.add('hidden')
  botao4.classList.add('hidden')
}

function DEBUG_AJUDASINFINITAS () {
  ajudas[0] = 1000
  ajudas[1] = 1000
  ajudas[2] = 1000
  ajudas[3] = 1000
}

// Atribuição de eventos para botões presentes no jogo:
/* --- MENU PRINCIPAL --- */
botaoStart.addEventListener('click', iniciarJogo)
botaoSala.addEventListener('click', () => {window.location.href = 'index_sala.php'})
botaoRegras.addEventListener('click', () => {window.location.href = 'informacoes.php'})

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
