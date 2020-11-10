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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
        <script>
            var perguntas = <?php echo json_encode($perguntasProntas)?>
        </script>
        <script defer src="js/game_sala.js"></script>
        <title>BOTANIK</title>
    </head>
    <body>
        <div id="bg-animado" class="bg">
            <div class="margem">
                <!--- MENU PRINCIPAL --->
                <div id="menuPrincipal">
                    <div id="cabecalho" class="cabecalho">
                        <div id="titulo" class="titulo">BOTANIK</div>
                        <div id="subtitulo" class="subtitulo">Jogo de perguntas e respostas para ensino de Botânica</div>
                    </div>
                    <div id="grupoBotoesMenuPrincipal" class="grupo-botoes-menu-principal btn-group-vertical">
                        <button id="botaoStart" class="botao-do-menu-principal">Começar</button>
                        <button id="botaoRegras" class="botao-do-menu-principal">Contribuição e contato</button>
                        <button id="botaoConfiguracoes" class="botao-do-menu-principal hidden">Configurações</button>
                    </div>
                </div>
                <!--- MENU DE CONFIGURAÇÕES --->
                <div id="menuConfiguracoes" class="menu-configuracoes hidden">
                    <div id="tituloConfiguracoes" class="display-4 titulo-configuracoes">CONFIGURAÇÕES</div>
                    <div id="grupoBotoesConfiguracoes" class="grupo-botoes-configuracoes" >
                        <div id="ambienteDeAplicacao">
                            <h4>Ambiente de aplicação:</h4> 
                            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div class="btn-group mr-1">
                                    <button id="botaoSalaDeAula" class="btn btn-info">Sala de aula</button>
                                    <button id="botaoSozinho" class="btn btn-info">Sozinho</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button id="voltarAoMenuPrincipal">Voltar ao menu principal</button>
                        </div>
                    </div>
                </div>
                <!--- O JOGO --->
                <div id="jogo" class="jogo hidden">
                    <div class="janelaPrincipal">
                        <div id="score" class="score h4">PONTUAÇÃO</div>
                        <div id="pergunta" class="comando">Pergunta</div>
                        <div id="imagemPlaceholder" class=""></div>
                        <div id="botoesReposta" class="grupo-botoes-resposta">
                            <button id="botaoAlternativa1" class="botao-resposta btn btn-dark">Alternativa #1</button>
                            <button id="botaoAlternativa2" class="botao-resposta btn btn-dark">Alternativa #2</button>
                            <button id="botaoAlternativa3" class="botao-resposta btn btn-dark">Alternativa #3</button>
                            <button id="botaoAlternativa4" class="botao-resposta btn btn-dark">Alternativa #4</button>
                        </div>
                        <div id="grupoBotoesAjuda" class="grupo-botoes-ajuda">
                            <button id="botaoCartas" class="btn btn-primary botao-ajuda" data-toggle="tooltip" data-placement="top" title="Abrir uma carta para eliminar alguma(s) alternativa(s) incorreta(s).">Utilizar cartas</button>
                            <button id="botaoConvidados" class="btn btn-primary botao-ajuda" data-toggle="tooltip" data-placement="top" title="Dá o direito de ajuda ao professor.">Perguntar ao professor</button>
                            <button id="botaoPlacas" class="btn btn-primary botao-ajuda" data-toggle="tooltip" data-placement="top" title="Dá direito de pedir assistência aos colegas.">Perguntar aos colegas</button>
                            <button id="botaoPula" class="btn btn-primary botao-ajuda"  data-toggle="tooltip" data-placement="top" title="Pula a pergunta atual, mas não será contada como ponto.">Pular pergunta</button>
                        </div>
                        <div id="grupoBotoesControle" class="grupo-botoes-controle">
                            <button id="botaoProximo" class="botao-controle">Próximo</button>
                            <button id="botaoReiniciar" class="botao-controle">Reiniciar</button>
                        </div>
                    </div>      
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
                        <li><a id="c-alternativa-confirmar" href="#">Sim</a></li>
                        <li><a id="c-alternativa-negar" href="#">Não</a></li>
		            </ul>
                </div>
            </div>

            <div id="c-ajuda" class="confirmacao-alternativa-popup hidden">
	            <div class="confirmacao-alternativa-popup-container">
		            <p>Você confirma que selecionou a ajuda?</p>
		            <ul class="cd-buttons">
                        <li><a id="c-ajuda-confirmar" href="#">Sim</a></li>
                        <li><a id="c-ajuda-negar" href="#">Não</a></li>
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
                                    <img src="imagens/background_quadrado-1.png" class="imagem-carta">
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
                                    <img src="imagens/background_quadrado-1.png" class="imagem-carta">
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
                                    <img src="imagens/background_quadrado-1.png" class="imagem-carta">
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
                                    <img src="imagens/background_quadrado-1.png" class="imagem-carta">
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
                        <h2 class="container-ajuda-titulo">Ajuda externa ativada!</h2>
                        <button class="xis" onclick="document.getElementById('container-principal-ajuda-dica').classList.add('hidden');">X</button>
                    </div>
                    <img src="imagens/computador-1.png">
                    <button id="botaoDica" class="botaoDica" onclick="window.open(perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].dica)">Clique aqui para abrir uma página com a dica.</button>
                </div>
            </div>

            <div id="container-principal-ajuda-pulo" class="container-principal-ajuda hidden">
                <div style="width: 100%; height:100%; overflow: auto;">
                    <div class="header">
                        <h2 class="container-ajuda-titulo">Pulo de questão ativado!</h2>
                        <button class="xis" onclick="document.getElementById('container-principal-ajuda-pulo').classList.add('hidden');">X</button>
                    </div>
                    <img src="imagens/salto-1.png">
                </div>
            </div>

            <div id="container-principal-ajuda-professor" class="container-principal-ajuda hidden">
                <div style="width: 100%; height:100%; overflow: auto;">
                    <h2 class="container-ajuda-titulo">Ajuda do professor ativada!</h2>
                    <button class="xis" onclick="document.getElementById('container-principal-ajuda-professor').classList.add('hidden');">X</button>
                    <img src="imagens/ensinando.png">
                    <p>Peça ajuda ao seu professor.</p>
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
        <script src="js/jquery-3.5.1.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
