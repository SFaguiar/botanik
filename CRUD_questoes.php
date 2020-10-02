<?php
  include("conexao.php");
  if (isset($_REQUEST["salvo"]) && ($_REQUEST["salvo"] == true)) {
    echo "QUESTÃO NOVA SALVA COM SUCESSO!";
  }
?>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <title>Criar, ler, atualizar e deletar: banco de questões</title>
    </head>

    <body style="margin: 10px 10px 10px 10px">
    <header>
      <h1>Criar, Ler, Atualizar e Deletar: Banco de Questões</h1>
      <hr>
    </header>
    <!--- FORMULÁRIO --->
    <div class="form-group">
      <form action="tratar.php" method="POST" name="formC" enctype="multipart/form-data" >
        <input type="hidden" name="acao" value="criar"/>
        <div class="row">
          <div class="col">
          <h5>Nível:</h5>
            <select class="form-control" id="nivel" name="nivel">
              <option value="1">1 - FÁCIL</option>
              <option value="2">2 - MÉDIO</option>
              <option value="3">3 - DIFÍCIL</option>
              <option value="4">4 - PERGUNTA FINAL (PARA ÚLTIMA PERGUNTA)</option>
            </select>
          </div>
          <div class="col">
            <h5>Tipo:</h5>
            <select class="form-control" id="tipo" name="tipo">
              <option value="ecologia e fisiologia vegetal">Ecologia e Fisiologia Vegetal</option>
              <option value="morfologia e anatomia vegetal">Morfologia e Anatomia Vegetal</option>
              <option value="diversidade">Diversidade</option>
            </select>
          </div>
        </div>
        <div>
          <h5>Comando da questão:</h5>
          <div>
            <textarea class="form-control" name="comando"></textarea>
          </div>
        </div>
        <div>
          <h5>Alternativa Correta:</h5>
          <div>
            <textarea class="form-control" name="alternativa1"></textarea>
          </div>
        </div>
        <div>
          <h5>Primeira alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa2"></textarea>
          </div>
        </div>
        <div>
          <h5>Segunda alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa3"></textarea>
          </div>
        </div>
        <div>
          <h5>Terceira alternativa incorreta:</h5>
          <div>
            <textarea class="form-control" name="alternativa4"></textarea>
          </div>
        </div>
        <div>
          <h5>Imagem (caso exista):</h5>
          <div>
            <input type="file" name="imagem" value=""/>
          </div>
        </div>
        <div>
          <input class="btn btn-primary" type="submit" value="Enviar" />
          <input class="btn btn-info" type="reset" value="Apagar caixas" />
        </div>
      </form>
    </div>

      <!--- TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA --->
    <div class="table-responsive text-center">
      <table class="table table-hover" border="1" width="100%">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nível</th>
            <th>Tipo</th>
            <th>Comando</th>
            <th>Imagem</th>
            <th>Alternativa correta</th>
            <th>Alternativa incorreta #1</th>
            <th>Alternativa incorreta #2</th>
            <th>Alternativa incorreta #3</th>
            <th>Opções</th>
          </tr>
        </thead>
      <?php
        try {
          $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo");
          if ($stmt->execute()) {
            while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
              echo "<tr>";
                echo "<td>".$rs->id."</td>";
                echo "<td>".$rs->nivel."</td>";
                echo "<td>".$rs->tipo."</td>";
                echo "<td>".$rs->comando."</td>";
                if ($rs->imagem != ""){
                  echo "<td><img src='data:image/jpeg;base64,".base64_encode($rs->imagem)."' alt='IMAGEM' style='width: 100px; height: 100px'/></td>";
                } else {
                  echo "<td>N/A</td>";
                }
                echo "<td>".$rs->alternativa1."</td>";
                echo "<td>".$rs->alternativa2."</td>";
                echo "<td>".$rs->alternativa3."</td>";
                echo "<td>".$rs->alternativa4."</td>";
                echo "<td>";
                  echo "<center>";
                    echo "<form action='tratar.php' method='POST' name='form".$rs->id."U' enctype='multipart/form-data'>";
                      echo "<input type='hidden' name='acao' value='redirecionarParaEditar'>";
                      echo "<button type='submit' name='id' class='btn btn-secondary' value=".$rs->id.">[ALTERAR]</button>";
                    echo "</form>";
                    echo "<form action='tratar.php' method='POST' name='form".$rs->id."D' enctype='multipart/form-data'>";
                      echo "<input type='hidden' name='acao' value='deletar'>";
                      echo "<button type='submit' name='id' class='btn btn-danger' value=".$rs->id.">[EXCLUIR]</button>";
                    echo "</form>"; 
                  echo "</center>";
                echo "</td>";                
              echo "</tr>";
          }
        } else {
          echo "Erro: não foi possível recuperar os dados do banco de dados.";
        }
          } catch (PDOException $erro) {
            echo "Erro: ".$erro->getMessage();
        }
        ?>
      </table>
    </div>

      <!--- BOOTSTRAP DEPENDENCIES --->
      <script src="js/jquery-3.5.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
    </body>
</html>