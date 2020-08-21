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
        <div class="bg">
        <div class="margem">
        <!--- MENU PRINCIPAL --->
        <div id="menuPrincipal">
            <div id="cabecalho" class="cabecalho">
                <div id="titulo" class="titulo">BOTANIK</div>
                <div id="subtitulo" class="subtitulo">Jogo de perguntas e respostas para ensino de Botânica</div>
            </div>
            <div id="grupoBotoesMenuPrincipal" class="grupoBotoesMenuPrincipal btn-group-vertical">
                <button id="botaoStart" class="botaoDoMenuPrincipal">Começar</button>
                <button id="botaoRegras" class="botaoDoMenuPrincipal">Regras</button>
                <button id="botaoConfiguracoes" class="botaoDoMenuPrincipal">Configurações</button>
            </div>
        </div>
        <!--- MENU DE CONFIGURAÇÕES --->
        <div id="menuConfiguracoes" class="menuConfiguracoes hidden">
            <div id="tituloConfiguracoes" class="display-4 tituloConfiguracoes">CONFIGURAÇÕES</div>
            <div id="grupoBotoesConfiguracoes" class="grupoBotoesConfiguracoes" >
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
                <div id="botoesReposta" class="grupoBotoesResposta">
                    <button id="botaoAlternativa1" class="botaoResposta btn btn-dark">Alternativa #1</button>
                    <button id="botaoAlternativa2" class="botaoResposta btn btn-dark">Alternativa #2</button>
                    <button id="botaoAlternativa3" class="botaoResposta btn btn-dark">Alternativa #3</button>
                    <button id="botaoAlternativa4" class="botaoResposta btn btn-dark">Alternativa #4</button>
                </div>
                <div id="grupoBotoesAjuda" class="grupoBotoesAjuda">
                    <button id="botaoCartas" class="btn btn-primary botaoAjuda">Utilizar cartas</button>
                    <button id="botaoConvidados" class="btn btn-primary botaoAjuda">Perguntar aos colegas</button>
                    <button id="botaoPlacas" class="btn btn-primary botaoAjuda">Utilizar as placas</button>
                    <button id="botaoPula" class="btn btn-primary botaoAjuda">Pular pergunta</button>
                </div>
                <div id="grupoBotoesControle" class="grupoBotoesControle">
                    <button id="botaoProximo" class="botaoControle">Próximo</button>
                    <button id="botaoReiniciar" class="botaoControle">Reiniciar</button>
                </div>
            </div>      
        </div>
        

        
            
        
        </div>
        </div>
        <?php 
            $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo WHERE imagem != ''");
            if ($stmt->execute()) {
            while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
                    echo "<img id='img".($rs->id)."' class='hidden imagem' src='data:image/jpeg;base64,".base64_encode($rs->imagem)."'/>";
                }
            }
        ?>
        <script src="js/jquery-3.5.1.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>
</html>
