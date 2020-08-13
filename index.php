<?php 
    include("conexao.php");

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
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
        <script>
            var perguntas = <?php echo json_encode($perguntasProntas)?>
        </script>
        <script defer src="js/game.js"></script>
        <title>BOTANIK</title>
    </head>
    <body>
        <div id="menuPrincipal" class="menuPrincipal">
            <div id="titulo" class="titulo display-4">BOTANIK</div>
            <div id="grupoBotoesMenuPrincipal" class="grupoBotoesMenuPrincipal btn-group-vertical">
                <button id="botaoStart" class="botaoDoMenuPrincipal">Começar</button>
                <button id="botaoRegras" class="botaoDoMenuPrincipal">Regras</button>
                <button id="botaoConfiguracoes" class="botaoDoMenuPrincipal">Configurações</button>
            </div>
        </div>
        <div id="menuConfiguracoes" class="menuConfiguracoes hidden">
            <div id="tituloConfiguracoes" class="titulo display-4">CONFIGURAÇÕES</div>
            <div id="botoesConfiguracoes" >
                <div class="botoesConfiguracoes">
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
        <div id="jogo" class="jogo hidden">
            <div class="janela">
                <div class="clearfix">
                    <div id="score" class="score float-right h4">PONTUAÇÃO</div>
                </div>
                <div id="containerDaPergunta" class="">
                    <div id="pergunta" class="comando">Pergunta</div>
                    <div id="botoesReposta" class="botao-grid">
                        <button id="botaoAlternativa1" class="botaoResposta">Alternativa #1</button>
                        <button id="botaoAlternativa2" class="botaoResposta">Alternativa #2</button>
                        <button id="botaoAlternativa3" class="botaoResposta">Alternativa #3</button>
                        <button id="botaoAlternativa4" class="botaoResposta">Alternativa #4</button>
                    </div>
                </div>
                <div id="containerDosControles" class="containerDosControles">
                    <button id="botaoProximo" class="btn btn-primary">Próximo</button>
                    <button id="botaoImagem" class="btn btn-danger btn-lg btn-block hidden">Imagem</button>
                    <button id="botaoAjuda" class="btn btn-primary btn-lg btn-block">Ajuda</button>
                    <button id="botaoReiniciar" class="btn btn-primary btn-lg btn-block hidden">Reiniciar</button>
                </div>
            </div>
            <div id="containerDaAjuda" class="hidden">
                <div class="modal-dialog modal-dialog-centered text-dark" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ajudas</h5>
                            <button type="button" class="close" id="botaoCancelar" class="btn btn-danger">X</button>
                        </div>
                        <div class="modal-body">
                            <p>Selecione sua ajuda. <br>
                            Você poderá usar, uma vez cada:<br>
                            - As cartas, que excluirão de 1 a 3 alternativas erradas; <br>
                            - Os convidados, que darão a resposta para você; e <br>
                            - A plateia, que dirá o que acha, com uma pequena chance de errar. <br>
                            Você também tem direito a pular até 3 questões. A questão pulada não será contada como acerto.</p>
                            <p id="pulosRestantes"></p>        
                        </div>
                        <div class="modal-footer text-center">
                            <button id="botaoCartas" class="btn btn-dark">Utilizar cartas</button>
                            <button id="botaoConvidados" class="btn btn-dark">Perguntar aos convidados</button>
                            <button id="botaoPlacas" class="btn btn-dark">Utilizar as placas</button>
                            <button id="botaoPula" class="btn btn-dark">Pular pergunta</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="containerDaImagem" class="hidden">
                <div class="modal-dialog modal-dialog-centered text-dark" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Imagem</h5>
                            <button type="button" class="close" id="botaoFecharImagem" class="btn btn-danger">X</button>
                        </div>
                        <div class="modal-body">
                            <?php 
                                $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo WHERE imagem != ''");
                                if ($stmt->execute()) {
                                while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
                                        echo "<img id='img".($rs->id)."' class='hidden' src='data:image/jpeg;base64,".base64_encode($rs->imagem)."' style='width: 100px; height: 100px'/>";
                                    }
                                }
                            ?>
                        </div>
                        <div class="modal-footer text-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
            
        <script src="js/jquery-3.5.1.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
