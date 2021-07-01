<?php 
    require_once "contador_visitas.php";

    function prepararListaDePerguntas($nivel, $conexao){
        $query = "SELECT * FROM `perguntas_jogo` WHERE `nivel` = ".$nivel;
        $stmt = $conexao->query($query);
        $lista = $stmt->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($lista); $i++) {
            if ($lista[$i]['imagem'] != ""){
                $lista[$i]['imagem'] = "1M4G3M";
            }
        }
        return $lista;
    }

    $perguntasProntas = array(
        1 => prepararListaDePerguntas(1, $conexao),
        2 => prepararListaDePerguntas(2, $conexao),
        3 => prepararListaDePerguntas(3, $conexao),
        4 => prepararListaDePerguntas(4, $conexao),
    );

    
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
        <div id="bg-animado" class="bg">
            <div class="margem">
                <!--- MENU PRINCIPAL --->
                <div id="menuPrincipal" class="menu-principal">
                    <div id="cabecalho" class="cabecalho">
                        <h1 id="titulo">BOTANIK</h1>
                        <h2 id="subtitulo">Jogo de perguntas e respostas para ensino de Botânica</h2>
                    </div>
                    <div class="grupo-botoes-menu-principal">
                        <button id="botaoStart" class="botao-do-menu-principal">Começar</button>
                        <button id="botaoSala" class="botao-do-menu-principal">Jogar em Sala</button>
                        <button id="botaoRegras" class="botao-do-menu-principal">Saiba Mais</button>
                    </div>
                </div>
                <!--- O JOGO --->
                <div id="jogo" class="jogo hidden">
                        <p id="pergunta" class="comando">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non varius ante, sed pulvinar est. Suspendisse imperdiet erat vel viverra dignissim. Pellentesque sed neque massa. Ut viverra purus a arcu aliquet tristique. Cras sapien dolor, eleifend et efficitur et, dictum ac urna. Sed lorem metus, lacinia nec augue nec, euismod vehicula sapien. Etiam pretium odio ultricies rhoncus gravida. Aliquam eget est sit amet nisi semper interdum ac id risus. Fusce eu dui suscipit, tincidunt purus et, commodo quam. Sed dui nisi, feugiat sed leo eget, vestibulum tempor nisl. Mauris condimentum sem ac mi euismod, quis condimentum odio gravida. Cras ornare libero nec convallis congue. Fusce suscipit lobortis felis nec elementum. Nam vitae nulla tristique, dignissim nunc a, pretium eros. Proin feugiat laoreet sodales. Ut eros arcu, ultricies sit amet porta vitae, mattis id ex. </p>
                        <div id="imagemPlaceholder"></div>
                        <div id="botoesReposta" class="grupo-botoes-resposta">
                            <button id="botaoAlternativa1" class="botao-resposta">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</button>
                            <button id="botaoAlternativa2" class="botao-resposta">Proin non varius ante, sed pulvinar est.</button>
                            <button id="botaoAlternativa3" class="botao-resposta">Suspendisse imperdiet erat vel viverra dignissim.</button>
                            <button id="botaoAlternativa4" class="botao-resposta">Pellentesque sed neque massa. Ut viverra purus a arcu aliquet tristique.</button>
                        </div>
                        <div class="grupo-botoes-ajuda">
                            <button id="botaoCartas" class="botao-ajuda" data-toggle="tooltip" data-placement="top" title="Abrir uma carta para eliminar alguma(s) alternativa(s) incorreta(s)."><img id="icone-cartas" src="imagens/card-ico.webp"><span id="cartas-restantes"></span></button>
                            <button id="botaoPlacas" class="botao-ajuda" data-toggle="tooltip" data-placement="top" title="Dá o link para um artigo como uma dica na internet."><img id="icone-dicas" src="imagens/help-ico.webp"><span id="dicas-restantes"></span></button>
                            <button id="botaoPula" class="botao-ajuda" data-toggle="tooltip" data-placement="top" title="Pula a pergunta atual, mas não será contada como ponto."><img id="icone-pulo" src="imagens/pular-ico.webp"><span id="pulos-restantes"></span></button>
                        </div>
                        <div class="grupo-botoes-controle">
                            <button id="botaoReiniciar" class="botao-controle">Reiniciar</button>
                            <button id="score">
                                <div class="container">
                                    <div class="vertical-center">
                                        <div class="progress-bar">
                                            PROGRESSO
                                            <div style="width: 50%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <button id="botaoProximo" class="botao-controle">Próximo</button>
                        </div>
                </div>
                <div class="game-over hidden" id="telaGameOver">
                    <h5>Game Over!</h5>
                    <p>Pontuação final: <span id="finalScore">PONTUACAO</span></p>
                    <p>Comando da questão: <span id="comandoGameOver">COMANDO</span></p>
                    <p>Resposta correta: <span id="respostaCorretaGameOver">RESPOSTA CORRETA</span></p>
                    <button id="gameOverReiniciar">Reiniciar Jogo</button>
                </div> 

            </div>
        </div>

            <?php 
                $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo WHERE imagem != ''");
                if ($stmt->execute()) {
                while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
                        echo "<a href='#' class='pop'>";
                        echo "<img id='img".($rs->id)."' class='hidden imagem' src='data:image/jpeg;base64,".base64_encode($rs->imagem)."'/>";
                        echo "</a>";
                    }
                }
            ?>

            <div id="c-alternativa" class="confirmacao-alternativa-popup hidden">
	            <div class="confirmacao-alternativa-popup-container">
		            <p>Você confirma que selecionou a alternativa?</p>
		            <ul class="cd-buttons">
                        <li id="c-alternativa-confirmar"><a>Sim</a></li>
                        <li id="c-alternativa-negar"><a>Não</a></li>
		            </ul>
                </div>
            </div>

            <div id="c-ajuda" class="confirmacao-alternativa-popup hidden">
	            <div class="confirmacao-alternativa-popup-container">
		            <p>Você confirma que selecionou a ajuda?</p>
		            <ul class="cd-buttons">
                        <li id="c-ajuda-confirmar"><a>Sim</a></li>
                        <li id="c-ajuda-negar"><a>Não</a></li>
		            </ul>
                </div>
            </div>
            
            <ul id="quatro-cartas" class="hidden">
                <li>
                    <label>
                        <div class="container-principal-carta" id="card1">
                        <input id="caixaCartaVirada1" class="hidden" type="checkbox">
                            <div class="carta">
                                <div class="carta-frente">
                                    <div class="titulo-carta-frente" id="tituloCarta1">REMOVER ALTERNATIVAS</div>
                                    <img src="imagens/background_quadrado-1.webp" class="imagem-carta">
                                    <button id="botaoMatarAlternativas1" class="botao-matar-alternativas">Clique aqui</button>
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
                                    <img src="imagens/background_quadrado-1.webp" class="imagem-carta">
                                    <button id="botaoMatarAlternativas2" class="botao-matar-alternativas">Clique aqui</button>
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
                                    <img src="imagens/background_quadrado-1.webp" class="imagem-carta">
                                    <button id="botaoMatarAlternativas3" class="botao-matar-alternativas">Clique aqui</button>
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
                                    <img src="imagens/background_quadrado-1.webp" class="imagem-carta">
                                    <button id="botaoMatarAlternativas4" class="botao-matar-alternativas">Clique aqui</button>
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

            <div id="container-principal-ajuda-dica" class="container-principal-ajuda hidden">
                <div style="width: 100%; height:100%; overflow: auto;">
                    <div class="header">
                        <h2 class="container-ajuda-titulo">Ajuda disponível!</h2>
                        <button class="xis" onclick="document.getElementById('container-principal-ajuda-dica').classList.add('hidden');">X</button>
                    </div>
                    <img src="imagens/computador-1.webp">
                    <button id="botaoDica" class="botaoDica" onclick="window.open(perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].dica)">Clique aqui para abrir uma página com a dica.</button>
                </div>
            </div>

            <div id="container-principal-ajuda-pulo" class="container-principal-ajuda hidden">
                <div style="width: 100%; height:100%; overflow: auto;">
                    <div class="header">
                        <h2 class="container-ajuda-titulo">Questão pulada!</h2>
                        <button class="xis" onclick="document.getElementById('container-principal-ajuda-pulo').classList.add('hidden');">X</button>
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
        <script defer src="js/inicializacao.js"></script>
        <script defer src="js/funcoes.js"></script>
        <script defer src="js/atribuicoes.js"></script>
    </body>
</html>
