<?php
  require_once "conexao.php";
  require_once "verifica_login.php";
  $q = "SELECT * FROM perguntas_jogo WHERE id = ".$_POST['id'];
  $stmt = $conexao->query($q);
  $questao = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <title>Editando questão de ID <?php print_r($_POST['id']) ?></title>
    </head>

    <body style="margin: 10px 10px 10px 10px">
    <header>
      <h1>Editando questão de ID <?php print_r($_POST['id']) ?>.</h1>
      <hr>
    </header>
    <!--- FORMULÁRIO --->
    <div class="form-group">
      <form action="tratar.php" method="POST" name="formU" enctype="multipart/form-data" >
        <input type="hidden" name="id" value=<?php print_r($_POST['id']) ?>>
        <input type="hidden" name="acao" value="editar"/>
        <div class="row">
          <div class="col">
          <h5>Nível:</h5>
            <select class="form-control" id="nivel" name="nivel">
              <option value="1" <?php if($questao['nivel'] == 1){
                echo "selected";
              } ?>>1 - FÁCIL</option>
              <option value="2" <?php if($questao['nivel'] == 2){
                echo "selected";
              } ?>>2 - MÉDIO</option>
              <option value="3" <?php if($questao['nivel'] == 3){
                echo "selected";
              } ?>>3 - DIFÍCIL</option>
              <option value="4" <?php if($questao['nivel'] == 4){
                echo "selected";
              } ?>>4 - PERGUNTA FINAL (PARA ÚLTIMA PERGUNTA)</option>
            </select>
          </div>
          <div class="col">
            <h5>Tipo:</h5>
            <select class="form-control" id="tipo" name="tipo">
              <option value="ecologia e fisiologia vegetal" <?php if($questao['tipo'] == 'ecologia e fisiologia vegetal'){
                echo "selected";
              } ?>>Ecologia e Fisiologia Vegetal</option>
              <option value="morfologia e anatomia vegetal" <?php if($questao['tipo'] == 'morfologia e anatomia vegetal'){
                echo "selected";
              } ?>>Morfologia e Anatomia Vegetal</option>
              <option value="diversidade" <?php if($questao['tipo'] == 'diversidade'){
                echo "selected";
              } ?>>Diversidade</option>
            </select>
          </div>
        </div>
        <div>
          <h5>Comando da questão:</h5>
          <div>
            <textarea class="form-control" name="comando"><?php print($questao['comando']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Alternativa Correta:</h5>
          <div>
            <textarea class="form-control" name="alternativa1"><?php print($questao['alternativa1']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Primeira alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa2"><?php print($questao['alternativa2']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Segunda alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa3"><?php print($questao['alternativa3']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Terceira alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa4"><?php print($questao['alternativa4']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Link para página com dica:</h5>
          <div>
            <textarea class="form-control" name="dica"><?php print($questao['dica']); ?></textarea>
          </div>
        </div>
        <div>
          <h5>Imagem (caso precise substituir):</h5>
          <div>
            <input id="entradaImagem" type="file" name="imagem" value=""> OU...
            Excluir imagem da questão: <input id="excluirImagem" type="checkbox" name="excluir" value="sim">
            
            <script>
                excluirImagem = getElementById('excluirImagem');
                entradaImagem = getElementById('entradaImagem');
                excluirImagem.addEventListener('click', function(){
                    if (excluirImagem.checked) {
                        entradaImagem.disabled = true;
                    } else {
                        entradaImagem.disabled = false;
                }
                })    
            </script>
          </div>
        </div>
        <div>
          <input class="btn btn-primary" type="submit" value="Enviar" />
          <input class="btn btn-info" type="reset" value="Apagar caixas" />
        </div>
      </form>
    </div>

      </table>
    </div>

      <!--- BOOTSTRAP DEPENDENCIES --->
      <script src="js/jquery-3.5.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
    </body>
</html>