<?php
  include("conexao.php");

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $id = (isset($_POST["id"]) && $_POST["id"] != null) ? $_POST["id"] : "";
      $nivel = (isset($_POST["nivel"]) && $_POST["nivel"] != null) ? $_POST["nivel"] : "";
      $tipo = (isset($_POST["tipo"]) && $_POST["tipo"] != null) ? $_POST["tipo"] : "";
      $comando = (isset($_POST["comando"]) && $_POST["comando"] != null) ? $_POST["comando"] : "";
      $alternativa1 = (isset($_POST["alternativa1"]) && $_POST["alternativa1"] != null) ? $_POST["alternativa1"] : "";
      $alternativa2 = (isset($_POST["alternativa2"]) && $_POST["alternativa2"] != null) ? $_POST["alternativa2"] : "";
      $alternativa3 = (isset($_POST["alternativa3"]) && $_POST["alternativa3"] != null) ? $_POST["alternativa3"] : "";
      $alternativa4 = (isset($_POST["alternativa4"]) && $_POST["alternativa4"] != null) ? $_POST["alternativa4"] : "";
      $imagem = (isset($_POST["imagem"]) && $_POST["imagem"] != null) ? $_POST["imagem"] : "";
    
  } else if (!isset($id)) {
      $id = (isset($_GET["id"]) && $_GET["id"] != null) ? $_GET["id"] : "";
      $nivel = NULL;
      $tipo = NULL;
      $comando = NULL;
      $alternativa1 = NULL;
      $alternativa2 = NULL;
      $alternativa3 = NULL;
      $alternativa4 = NULL;
      $imagem = NULL;
  }

  if (isset($_REQUEST["act"]) && $_REQUEST["act"] == "save" && $comando != "") {
    try {
      if ($id != ""){
        $stmt = $conexao->prepare("UPDATE perguntas_jogo SET tipo=?, nivel=?, comando=?, imagem=?, alternativa1=?, alternativa2=?, alternativa3=?, alternativa4=? WHERE id = ?");
        $stmt->bindParam(9, $id);
      } else {
        $stmt = $conexao->prepare("INSERT INTO perguntas_jogo (tipo, nivel, comando, imagem, alternativa1, alternativa2, alternativa3, alternativa4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      }
      $stmt->bindParam(1, $tipo);
      $stmt->bindParam(2, $nivel);
      $stmt->bindParam(3, $comando);
      $stmt->bindParam(4, $imagem);
      $stmt->bindParam(5, $alternativa1);
      $stmt->bindParam(6, $alternativa2);
      $stmt->bindParam(7, $alternativa3);
      $stmt->bindParam(8, $alternativa4);

      if ($stmt->execute()){
        if ($stmt->rowCount() > 0) {
          echo "Dados cadastrados com sucesso!";
          $id = null;
          $tipo = null;
          $nivel = null;
          $comando = null;
          $imagem = null;
          $alternativa1 = null;
          $alternativa2 = null;
          $alternativa3 = null;
          $alternativa4 = null;
        } else {
          echo "Erro ao tentar enviar dados.";
        }
      } else {
        throw new PDOException("ERRO: NÃO FOI POSSÍVEL EXECUTAR A DECLARAÇÃO SQL.");
      }
    } catch (PDOException $erro){
      echo "ERRO: " . $erro->getMessage();
    }
  }

  if (isset($_REQUEST["act"]) && $_REQUEST["act"] == "upd" && $id != "") {
    try {
        $stmt = $conexao->prepare("SELECT * FROM perguntas_jogo WHERE id = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            $rs = $stmt->fetch(PDO::FETCH_OBJ);
            $id = $rs->id;
            $tipo = $rs->tipo;
            $nivel = $rs->nivel;
            $comando = $rs->comando;
            $imagem = $rs->imagem;
            $alternativa1 = $rs->alternativa1;
            $alternativa2 = $rs->alternativa2;
            $alternativa3 = $rs->alternativa3;
            $alternativa4 = $rs->alternativa4;
            echo "dados alterdados?";
        } else {
            throw new PDOException("Erro: Não foi possível executar a declaração sql");
        }
    } catch (PDOException $erro) {
        echo "Erro: ".$erro->getMessage();
    }
  }

  if (isset($_REQUEST["act"]) && $_REQUEST["act"] == "del" && $id != "") {
    try {
        $stmt = $conexao->prepare("DELETE FROM perguntas_jogo WHERE id = ?");
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            echo "Registo foi excluído com êxito";
            $id = null;
        } else {
            throw new PDOException("Erro: Não foi possível executar a declaração sql");
        }
    } catch (PDOException $erro) {
        echo "Erro: ".$erro->getMessage();
    }
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
    <!--- FORMULÁRIO --->
    <h1>Criar, Ler, Atualizar e Deletar: Banco de Questões</h1>
    <hr>
    <div class="form-group">
        <form action="?act=save" method="POST" name="form1" >
          <input type="hidden" name="id" <?php
            if (isset($id) && $id != null || $id != "") {
            echo "value=\"{$id}\"";
            } ?> />
          <div class="row">
            <div class="col">
            <h5>Nível:</h5>
              <select class="form-control" id="nivel" name="nivel" <?php
                if (isset($nivel) && $nivel != null || $nivel != ""){
                    echo "value=\"{$nivel}\"";
                } ?> >
                <option value="1">1 - FÁCIL</option>
                <option value="2">2 - MÉDIO</option>
                <option value="3">3 - DIFÍCIL</option>
                <option value="4">4 - PERGUNTA FINAL (PARA ÚLTIMA PERGUNTA)</option>
              </select>
            </div>
            <div class="col">
            <h5>Tipo:</h5>
              <select class="form-control" id="tipo" name="tipo" <?php
                if (isset($tipo) && $tipo != null || $tipo != ""){
                    echo "value=\"{$tipo}\"";
                } ?> >
                <option value="ecologia e fisiologia vegetal">Ecologia e Fisiologia Vegetal</option>
                <option value="morfologia e anatomia vegetal">Morfologia e Anatomia Vegetal</option>
                <option value="diversidade">Diversidade</option>
              </select>
            </div>
          </div>
          <div>
          <h5>Comando da questão:</h5>
            <div>
              <textarea class="form-control" name="comando" <?php
                if (isset($comando) && $comando != null || $comando != ""){
                    echo "value=\"{$comando}\"";
                } ?> ></textarea>
            </div>
          </div>
          <h5>Alternativa Correta:</h5>
          <div>
            <textarea class="form-control" name="alternativa1" <?php if (isset($alternativa1) && $alternativa1 != null || $alternativa1 != ""){
              echo "value=\"{$alternativa1}\"";} ?> ></textarea>
          </div>
          <h5>Primeira alternativa incorreta:</h5>
          <div>
          <textarea class="form-control" name="alternativa2" <?php if (isset($alternativa2) && $alternativa2 != null || $alternativa2 != ""){
            echo "value=\"{$alternativa2}\"";} ?> ></textarea>
          </div>
          <h5>Segunda alternativa incorreta:</h5>
          <div>
          <textarea class="form-control" name="alternativa3" <?php if (isset($alternativa3) && $alternativa3 != null || $alternativa3 != ""){
            echo "value=\"{$alternativa3}\"";} ?> ></textarea>
          </div>
          <h5>Terceira alternativa incorreta:</h5>
          <div>
          <textarea class="form-control" name="alternativa4" <?php if (isset($alternativa4) && $alternativa4 != null || $alternativa4 != ""){
            echo "value=\"{$alternativa4}\"";} ?> ></textarea>
          </div>
          <h5>Imagem (caso exista):</h5>
          <div>
          <input type="file" name="imagem" <?php
            if (isset($imagem) && $imagem != null || $imagem != ""){
                echo "value=\"{$imagem}\"";
            } ?> />
          </div>
          <div>
            <input class="btn btn-primary" type="submit" value="Enviar" />
            <input class="btn btn-info" type="reset" value="Apagar caixas" />
          </div>
        </form>
      </div>

      <!--- TABELA --->
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
                echo "<td>".$rs->id."</td><td>".$rs->nivel."</td><td>".$rs->tipo."</td><td>".$rs->comando."</td><td>".$rs->imagem."</td><td>".$rs->alternativa1."</td><td>".$rs->alternativa2."</td><td>".$rs->alternativa3."</td><td>".$rs->alternativa4.
                  "</td><td><center><a class='btn btn-secondary' href=\botanik/novas_questoes.php?act=upd&id=" . $rs->id . ">[Alterar]</a>"
                  ."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                  ."<a class='btn btn-danger' href=\botanik/novas_questoes.php?act=del&id=" . $rs->id . ">[Excluir]</a></center></td>";
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