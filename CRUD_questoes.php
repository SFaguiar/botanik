<?php
  require_once "conexao.php";
  require_once "verifica_login.php";
  if (isset($_REQUEST["salvo"]) && ($_REQUEST["salvo"] == true)) {
    echo "QUESTÃO NOVA SALVA COM SUCESSO!";
  }
?>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="css/reset.css">
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <link rel="stylesheet" href="css/style-crud.css">
      <title>Criar, ler, atualizar e deletar: banco de questões</title>
    </head>
    <body>
    <header>
      <div class="caixa">
        <h1>Criar, Ler, Atualizar e Deletar: Banco de Questões</h1>
        <nav>
          <ul class="navegacao">
            <li><a href="logout.php">SAIR</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <!--- FORMULÁRIO --->
    <main>
    <div class="create">
    <div class="form-group">
      <form action="tratar.php" method="POST" name="formC" enctype="multipart/form-data" >
        <input type="hidden" name="acao" value="criar"/>
        <div class="row">
          <div class="col">
          <label for="nivel">Nível:</label>
            <select class="form-control" id="nivel" name="nivel">
              <option value="1">1 - FÁCIL</option>
              <option value="2">2 - MÉDIO</option>
              <option value="3">3 - DIFÍCIL</option>
              <option value="4">4 - PERGUNTA FINAL (PARA ÚLTIMA PERGUNTA)</option>
            </select>
          </div>
          <div class="col">
            <label for="tipo">Tipo:</label>
            <select class="form-control" id="tipo" name="tipo">
              <option value="ecologia e fisiologia vegetal">Ecologia e Fisiologia Vegetal</option>
              <option value="morfologia e anatomia vegetal">Morfologia e Anatomia Vegetal</option>
              <option value="diversidade">Diversidade</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="comando-form">Comando da questão:
              <textarea class="form-control" name="comando" id="comando-form" required></textarea>
            </label>
          </div>
          <div class="col">
            <label for="alternativa1-form">Alternativa Correta:
              <textarea class="form-control" name="alternativa1" id="alternativa1-form" required></textarea>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="alternativa2-form">Primeira alternativa incorreta:
              <textarea class="form-control" name="alternativa2" id="alternativa2-form" required></textarea>
            </label>
          </div>
          <div class="col">
            <label for="alternativa3-form"> Segunda alternativa incorreta:
              <textarea class="form-control" name="alternativa3" id="alternativa3-form" required></textarea>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="alternativa4-form">Terceira alternativa incorreta:
              <textarea class="form-control" name="alternativa4" id="alternativa4-form" required></textarea>
            </label>
          </div>
          <div class="col">
            <label for="dica-form">Link para página com dica:
              <textarea class="form-control" name="dica" id="dica-form" required></textarea>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="imagem-form"> Imagem (se existir):
              <input type="file" name="imagem" id="imagem-form" value=""/>
            </label>
            </div>
            <div class="col">
              <div class="botoesC">
                <input class="btn btn-primary" type="submit" value="Enviar" />
                <input class="btn btn-info" type="reset" value="Apagar caixas" />
              </div>
            </div>
          </div>
      </form>
    </div>
    </div>

    <!--- TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA TABELA --->
    <div class="table-responsive text-center">
      <table class="table table-hover" border="1" style="overflow:scroll;">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nível</th>
            <th scope="col">Tipo</th>
            <th scope="col">Comando</th>
            <th scope="col">Imagem</th>
            <th scope="col">Alternativa correta</th>
            <th scope="col">Alternativa incorreta #1</th>
            <th scope="col">Alternativa incorreta #2</th>
            <th scope="col">Alternativa incorreta #3</th>
            <th scope="col">Dica</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
      <?php
        try {
          $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo");
          if ($stmt->execute()) {
            while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
              echo "<tr>";
                echo "<th scope='row'>".$rs->id."</th>";
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
                echo "<td>".$rs->dica."</td>";
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

        </tbody>
      </table>
    </div>
    </main>

      <!--- BOOTSTRAP DEPENDENCIES --->
      <script src="js/jquery-3.5.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
    </body>
</html>