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

    // print_r($perguntasProntas);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script>
        var perguntas = <?php echo json_encode($perguntasProntas)?>
    </script>
    <script defer src="game.js"></script>
    <title>BOTANIK</title>
</head>
<body onresize="getTamanhoDaJanela()">
    <div class="janela">
        <div class="tituloJanela">BOTANIK</div>
        <div id="score" class="score hidden"> PONTUAÇÃO </div>
        <div id="containerDaPergunta" class="hidden">
            <div id="pergunta">Pergunta</div>
            <div id="botoesReposta" class="botao-grid">
                <button id="botaoAlternativa1" class="hidden">Alternativa #1</button>
                <button id="botaoAlternativa2" class="hidden">Alternativa #2</button>
                <button id="botaoAlternativa3" class="hidden">Alternativa #3</button>
                <button id="botaoAlternativa4" class="hidden">Alternativa #4</button>
            </div>
        </div>
        <div id="containerDosControles" class="containerDosControles">
            <button id="botaoStart" class="">Começar</button>
            <button id="botaoRegras" class="">Regras</button>
            <button id="botaoConfiguracoes" class="">Configurações</button>
            <button id="botaoProximo" class="hidden">Próximo</button>
            <button id="botaoAjuda" class="hidden">Ajuda</button>
            
        </div>
    </div>
    <div id="containerDaAjuda" class="janelaAjuda hidden">
        <div id="botoesAjuda" class="botao-grid">
            <button id="botaoCartas" class="">Utilizar cartas</button>
            <button id="botaoConvidados" class="">Perguntar aos convidados</button>
            <button id="botaoPlacas" class="">Utilizar as placas</button>
            <button id="botaoPula" class="">Pular pergunta</button>
            <button id="botaoCancelar" class="">X</button>
        </div>
    </div>
</body>
</html>