<?php 
    include("conexao.php");

    function prepararListaDePerguntas($nivel, $conexao){
        
        $query = "SELECT * FROM `perguntas_jogo` WHERE `imagem` = '' AND `nivel` = ".$nivel;
        $stmt = $conexao->query($query);
        $listaPronta = $stmt->fetchAll();
        return $listaPronta;
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
    <body onresize="getTamanhoDaJanela()">
        <div class="janela">
            <div class="clearfix">
                <div id="titulo" class="display-4 float-left">BOTANIK</div>
                <div id="score" class="float-right h4 hidden">PONTUAÇÃO</div>
            </div>
            <div id="containerDaPergunta" class="hidden">
                <div id="pergunta" class="">Pergunta</div>
                <div id="botoesReposta" class="botao-grid">
                    <button id="botaoAlternativa1" class="btn btn-secondary hidden">Alternativa #1</button>
                    <button id="botaoAlternativa2" class="btn btn-secondary hidden">Alternativa #2</button>
                    <button id="botaoAlternativa3" class="btn btn-secondary hidden">Alternativa #3</button>
                    <button id="botaoAlternativa4" class="btn btn-secondary hidden">Alternativa #4</button>
                </div>
            </div>
            <div id="containerDosControles" class="containerDosControles">
                <div id="botoesMenuPrincipal" class="btn-group">
                    <button id="botaoStart" class="btn btn-primary">Começar</button>
                    <button id="botaoRegras" class="btn btn-primary">Regras</button>
                    <button id="botaoConfiguracoes" class="btn btn-primary">Configurações</button>
                </div>
                <button id="botaoProximo" class="btn btn-primary hidden">Próximo</button>
                <button id="botaoAjuda" class="btn btn-primary btn-lg btn-block hidden">Ajuda</button>
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
        
        <script src="js/jquery-3.5.1.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
