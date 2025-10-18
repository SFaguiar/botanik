<?php 
  require_once "includes/conexao.php";
  // Centraliza a busca de dados do jogo
  require_once "includes/game_data.php";

?>
<!DOCTYPE html>
<html lang="pt-br">
 <head>
  <title>BOTANIK</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style-global.css">
  <link rel="stylesheet" href="css/style-menu.css">
  <link rel="stylesheet" href="css/style-game.css">
  <script src="js/jquery-3.5.1.min.js"></script>
  <script defer>
   var perguntas = <?php echo json_encode($perguntasProntas)?>;
   var configuracoes;
   
   $.getJSON('aparencia.json', function(data) {
    configuracoes = data;
   })

   window.addEventListener("load", function(){
    const loader = document.querySelector(".loader");
    loader.classList.add('hidden');
   } )
  </script>
  <script defer src="js/configurador.js"></script>
 </head>
 <body>
  <div class="loader">
   <img src="imagens/loading.gif" alt="Carregando..." />
  </div>

   <!--- MENU PRINCIPAL --->
   <div id="main-menu" class="main-menu">
    <div class="header">
     <h1 class="game-title">BOTANIK</h1>
     <h2 class="game-subtitle">Jogo de perguntas e respostas para ensino de Botânica</h2>
    </div>
    <div class="menu-buttons">
     <button id="btn-start" class="btn-menu">Começar</button>
     <button id="btn-room" class="btn-menu hidden">Jogar em Sala</button>
     <button id="btn-rules" class="btn-menu">Saiba Mais</button>
    </div>
   </div>
   <!--- O JOGO --->
   <div id="game-area" class="game-area hidden">
     <p id="question-text" class="question-command">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non varius ante, sed pulvinar est. Suspendisse imperdiet erat vel viverra dignissim. Pellentesque sed neque massa. Ut viverra purus a arcu aliquet tristique. Cras sapien dolor, eleifend et efficitur et, dictum ac urna. Sed lorem metus, lacinia nec augue nec, euismod vehicula sapien. Etiam pretium odio ultricies rhoncus gravida. Aliquam eget est sit amet nisi semper interdum ac id risus. Fusce eu dui suscipit, tincidunt purus et, commodo quam. Sed dui nisi, feugiat sed leo eget, vestibulum tempor nisl. Mauris condimentum sem ac mi euismod, quis condimentum odio gravida. Cras ornare libero nec convallis congue. Fusce suscipit lobortis felis nec elementum. Nam vitae nulla tristique, dignissim nunc a, pretium eros. Proin feugiat laoreet sodales. Ut eros arcu, ultricies sit amet porta vitae, mattis id ex. </p>
     <div id="image-placeholder"></div>
     <div id="answer-buttons" class="answer-buttons-group">
      <button id="btn-alt-1" class="btn-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</button>
      <button id="btn-alt-2" class="btn-answer">Proin non varius ante, sed pulvinar est.</button>
      <button id="btn-alt-3" class="btn-answer">Suspendisse imperdiet erat vel viverra dignissim.</button>
      <button id="btn-alt-4" class="btn-answer">Pellentesque sed neque massa. Ut viverra purus a arcu aliquet tristique.</button>
     </div>
     <div class="help-buttons-group">
      <button id="btn-cards" class="btn-help" data-toggle="tooltip" data-placement="top" title="Abrir uma carta para eliminar alguma(s) alternativa(s) incorreta(s)."><img class="help-icon" src="imagens/card-ico.webp"><span id="cards-remaining"></span></button>
      <button id="btn-hints" class="btn-help" data-toggle="tooltip" data-placement="top" title="Dá o link para um artigo como uma dica na internet."><img class="help-icon" src="imagens/help-ico.webp"><span id="hints-remaining"></span></button>
      <button id="btn-skip" class="btn-help" data-toggle="tooltip" data-placement="top" title="Pula a pergunta atual, mas não será contada como ponto."><img class="help-icon" src="imagens/pular-ico.webp"><span id="skips-remaining"></span></button>
     </div>
     <div class="control-buttons-group">
      <button id="btn-restart" class="btn-control">Reiniciar</button>
      <button id="score">
       <div class="container">
        <div class="vertical-center">
         <div class="progress-bar">
          PROGRESSO
          <div></div>
         </div>
        </div>
       </div>
      </button>
      <button id="btn-next" class="btn-control">Próximo</button>
     </div>
   </div>
   <div class="game-over hidden" id="telaGameOver">
    <header>
     <h5>Game Over!</h5>
    </header>
    <main>
     <p>Pontuação final: <span id="final-score">PONTUACAO</span></p>
     <p>Comando da questão: <span id="game-over-command">COMANDO</span></p>
     <p>Resposta correta: <span id="game-over-answer">RESPOSTA CORRETA</span></p>
     <button id="btn-game-over-restart">Reiniciar Jogo</button>
     <button href = "https://docs.google.com/forms/d/1oxdRm7G3wI7gnSAEBvZDNI3BKAtwU_mNSWdM7vMDWn0/edit?usp=sharing" id="botaoFormulario"> Ajude-nos a melhorar o jogo </button>
    </main>
   </div> 

   <?php 
    // Renderiza as imagens preparadas pelo game_data.php
    foreach ($imagensProntas as $img) {
        echo "<a href='#' class='pop'>
                <img id='img{$img['id']}' class='hidden imagem' src='{$img['src']}'/>
              </a>";
    }
   ?>

   <div id="confirm-answer-popup" class="confirmation-popup hidden">
	   <div class="popup-container">
		   <p>Você confirma que selecionou a alternativa?</p>
		   <ul class="popup-buttons">
      <li id="btn-confirm-answer"><a>Sim</a></li>
      <li id="btn-deny-answer"><a>Não</a></li>
		   </ul>
    </div>
   </div>

   <div id="confirm-help-popup" class="confirmation-popup hidden">
	   <div class="popup-container">
		   <p>Você confirma que selecionou a ajuda?</p>
		   <ul class="popup-buttons">
      <li id="btn-confirm-help"><a>Sim</a></li>
      <li id="btn-deny-help"><a>Não</a></li>
		   </ul>
    </div>
   </div>
   
   <ul id="card-deck" class="hidden">
    <li>
     <label>
      <div class="container-principal-carta" id="card1">
      <input id="caixaCartaVirada1" class="hidden" type="checkbox">
       <div class="carta">
        <div class="carta-frente">
         <div class="titulo-carta-frente" id="tituloCarta1">REMOVER ALTERNATIVAS</div>
         <img src="imagens/background_quadrado-1.webp" class="card-image">
         <button class="btn-kill-answer">Clique aqui</button>
        </div>
        <div class="carta-costa">
         <div class="contorno-carta">
          <div class="conteudo-carta-costa">
           <h4>Botanik</h4>
          </div>
         </div> 
        </div>
       </div>
      </div>
     </label>
    </li>
    <li>
     <label>
      <div class="container-principal-carta" id="card2">
       <input id="caixaCartaVirada2" class="hidden" type="checkbox">
       <div class="carta">
        <div class="carta-frente">
         <div class="titulo-carta-frente" id="tituloCarta2">REMOVER ALTERNATIVAS</div>
         <img src="imagens/background_quadrado-1.webp" class="card-image">
         <button class="btn-kill-answer">Clique aqui</button>
        </div>
        <div class="carta-costa">
         <div class="contorno-carta">
          <div class="conteudo-carta-costa">
           <h4>Botanik</h4>
          </div>
         </div> 
        </div>
       </div>
      </div>
     </label>
    </li>
    <li>
     <label>
      <div class="container-principal-carta" id="card3">
      <input id="caixaCartaVirada3" class="hidden" type="checkbox">
       <div class="carta">
        <div class="carta-frente">
         <div class="titulo-carta-frente" id="tituloCarta3">REMOVER ALTERNATIVAS</div>
         <img src="imagens/background_quadrado-1.webp" class="card-image">
         <button class="btn-kill-answer">Clique aqui</button>
        </div>
        <div class="carta-costa">
         <div class="contorno-carta">
          <div class="conteudo-carta-costa">
           <h4>Botanik</h4>
          </div>
         </div> 
        </div>
       </div>
      </div>
     </label>
    </li>
    <li>
     <label>
      <div class="container-principal-carta" id="card4">
      <input id="caixaCartaVirada4" class="hidden" type="checkbox">
       <div class="carta">
        <div class="carta-frente">
         <div class="titulo-carta-frente" id="tituloCarta4">REMOVER ALTERNATIVAS</div>
         <img src="imagens/background_quadrado-1.webp" class="card-image">
         <button class="btn-kill-answer">Clique aqui</button>
        </div>
        <div class="carta-costa">
         <div class="contorno-carta">
          <div class="conteudo-carta-costa">
           <h4>Botanik</h4>
          </div>
         </div> 
        </div>
       </div>
      </div>
     </label>
    </li>
   </ul>

   <div id="hint-popup" class="help-popup-container hidden">
    <div style="width: 100%; height:100%; overflow: auto;">
     <div class="header">
      <h2 class="help-popup-title">Ajuda disponível!</h2>
      <button class="btn-close-popup" onclick="document.getElementById('hint-popup').classList.add('hidden');">X</button>
     </div>
     <img src="imagens/computador-1.webp">
     <button id="btn-open-hint" class="btn-hint" onclick="window.open(gameState.currentQuestion.dica)">Clique aqui para abrir uma página com a dica.</button>
    </div>
   </div>

   <div id="skip-popup" class="help-popup-container hidden">
    <div style="width: 100%; height:100%; overflow: auto;">
     <div class="header">
      <h2 class="help-popup-title">Questão pulada!</h2>
      <button class="btn-close-popup" onclick="document.getElementById('skip-popup').classList.add('hidden');">X</button>
     </div>
     <img src="imagens/salto-1.webp">
    </div>
   </div>

   <div class="modal modal-imagem fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
     <div class="modal-content">     
      <div class="modal-body">
       <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
      <img src="" class="imagepreview" style="width: 100%;" >
     </div>
    </div>
   </div>
   
  </div>
  
  <script defer src="js/popper.min.js"></script>
  <script defer src="js/bootstrap.min.js"></script>
  <script defer src="js/game.js"></script>
 </body>
</html>
