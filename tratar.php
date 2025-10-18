<?php
  session_start();
  require_once "conexao.php";
  require_once "verifica_login.php";
  $q = "select id from perguntas_jogo order by id DESC limit 1";
  $stmt = $conexao->query($q);
  $lastrow = $stmt->fetch(PDO::FETCH_ASSOC);
  $lastID = $lastrow["id"];
  $newID = $lastID + 1;

  try {
    if ($_POST["acao"] === "criar") {
      $nivel = $_POST["nivel"];
      $tipo = $_POST["tipo"];
      $comando = $_POST["comando"];
      $alternativa1 = $_POST["alternativa1"];
      $alternativa2 = $_POST["alternativa2"];
      $alternativa3 = $_POST["alternativa3"];
      $alternativa4 = $_POST["alternativa4"];
      $dica = $_POST["dica"];
      if ($_FILES["imagem"]["size"] != 0){
        $imagem = addslashes(file_get_contents($_FILES["imagem"]["tmp_name"]));
        $imagemTipo = $_FILES["imagem"]["type"];
        if (substr($imagemTipo, 0, 5) == "image"){
          $stmt = $conexao->prepare("INSERT INTO perguntas_jogo (id, nivel, tipo, comando, imagem, alternativa1, alternativa2, alternativa3, alternativa4, dica) VALUES ('$newID','$nivel', '$tipo', '$comando', '$imagem', '$alternativa1', '$alternativa2', '$alternativa3', '$alternativa4', '$dica')");
        } else {
          die("Erro, tipo de arquivo não é imagem!");
        }
      } else {
        $stmt = $conexao->prepare("INSERT INTO perguntas_jogo (id, nivel, tipo, comando, imagem, alternativa1, alternativa2, alternativa3, alternativa4, dica) VALUES ('$newID', '$nivel', '$tipo', '$comando', '', '$alternativa1', '$alternativa2', '$alternativa3', '$alternativa4', '$dica')");
      }
      $conexao->exec($stmt->queryString);
    } else if ($_POST["acao"] === "deletar") {
      $stmt = $conexao->prepare("DELETE FROM perguntas_jogo WHERE id = ". $_POST["id"]);
      $conexao->exec($stmt->queryString);
    } else if ($_POST["acao"] === "redirecionarParaEditar") {
      $q = "SELECT * FROM perguntas_jogo WHERE id = ". $_POST["id"];
      $stmt = $conexao->query($q);
      $lista = $stmt->fetch(PDO::FETCH_ASSOC);
      $id = $lista['id'];
    } else if ($_POST["acao"] === "editar"){
      $id = $_POST["id"];
      $nivel = $_POST["nivel"];
      $tipo = $_POST["tipo"];
      $comando = $_POST["comando"];
      $alternativa1 = $_POST["alternativa1"];
      $alternativa2 = $_POST["alternativa2"];
      $alternativa3 = $_POST["alternativa3"];
      $alternativa4 = $_POST["alternativa4"];
      $dica = $_POST["dica"];
      if ($_FILES["imagem"]["size"] != 0){
        $imagem = addslashes(file_get_contents($_FILES["imagem"]["tmp_name"]));
        $imagemTipo = $_FILES["imagem"]["type"];
        if (substr($imagemTipo, 0, 5) == "image"){
          $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel='$nivel', tipo='$tipo', comando='$comando', imagem='$imagem', alternativa1='$alternativa1', alternativa2='$alternativa2', alternativa3='$alternativa3', alternativa4='$alternativa4', dica='$dica' WHERE id ='$id'");
        } else {
          die("Erro, tipo de arquivo não é imagem!");
        }
      } else if(($_POST["excluir"] == "sim") && isset($_POST["excluir"])){
        $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel='$nivel', tipo='$tipo', comando='$comando', imagem='', alternativa1='$alternativa1', alternativa2='$alternativa2', alternativa3='$alternativa3', alternativa4='$alternativa4', dica='$dica' WHERE id ='$id'");
      } else {
        $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel='$nivel', tipo='$tipo', comando='$comando', alternativa1='$alternativa1', alternativa2='$alternativa2', alternativa3='$alternativa3', alternativa4='$alternativa4', dica='$dica' WHERE id ='$id'");
      }
      $conexao->exec($stmt->queryString);
    }
  } catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
  }
?>

<html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="css/bootstrap.min.css">
      <title>Enviando dados para o banco...</title>
    </head>
    <body>

    <?php if ($_POST["acao"] === "redirecionarParaEditar"){ ?>
      <form action="atualizar_questao.php" id="formularioRedirecionamento" method="POST">
        <input type="hidden" name="id" value=<?php echo json_encode($id) ?> >
      </form>
      <script type="text/javascript">
        document.getElementById('formularioRedirecionamento').submit();
      </script>
    <?php } ?>

    <?php if (($_POST["acao"] === "criar") || ($_POST["acao"] === "editar")){ ?>
      <script>
        window.location.href = "CRUD_questoes.php?salvo=true";
      </script>
    <?php } ?>
    
    </body>
</html>