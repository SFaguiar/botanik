<?php
  if (session_status() === PHP_SESSION_NONE) {
    session_start();
  }
  require_once "conexao.php";
  require_once "verifica_login.php";
  $conexao = getConexao();

  try {
    if ($_POST["acao"] === "criar") {
      // É mais seguro e eficiente configurar a coluna 'id' como AUTO_INCREMENT no banco de dados.
      // A lógica abaixo para encontrar o próximo ID pode falhar em ambientes com múltiplos usuários.
      $nivel = $_POST["nivel"];
      $tipo = $_POST["tipo"];
      $comando = $_POST["comando"];
      $alternativa1 = $_POST["alternativa1"];
      $alternativa2 = $_POST["alternativa2"];
      $alternativa3 = $_POST["alternativa3"];
      $alternativa4 = $_POST["alternativa4"];
      $dica = $_POST["dica"];
      if ($_FILES["imagem"]["size"] != 0){
        $imagem = file_get_contents($_FILES["imagem"]["tmp_name"]);
        $imagemTipo = $_FILES["imagem"]["type"];
        if (substr($imagemTipo, 0, 5) == "image"){
          $stmt = $conexao->prepare("INSERT INTO perguntas_jogo (nivel, tipo, comando, imagem, alternativa1, alternativa2, alternativa3, alternativa4, dica) VALUES (:nivel, :tipo, :comando, :imagem, :alternativa1, :alternativa2, :alternativa3, :alternativa4, :dica)");
          $stmt->bindParam(':imagem', $imagem, PDO::PARAM_LOB);
        } else {
          die("Erro, tipo de arquivo não é imagem!");
        }
      } else {
        $stmt = $conexao->prepare("INSERT INTO perguntas_jogo (nivel, tipo, comando, alternativa1, alternativa2, alternativa3, alternativa4, dica) VALUES (:nivel, :tipo, :comando, :alternativa1, :alternativa2, :alternativa3, :alternativa4, :dica)");
      }
      $stmt->bindParam(':nivel', $nivel);
      $stmt->bindParam(':tipo', $tipo);
      $stmt->bindParam(':comando', $comando);
      $stmt->bindParam(':alternativa1', $alternativa1);
      $stmt->bindParam(':alternativa2', $alternativa2);
      $stmt->bindParam(':alternativa3', $alternativa3);
      $stmt->bindParam(':alternativa4', $alternativa4);
      $stmt->bindParam(':dica', $dica);
      $stmt->execute();

      header('Location: CRUD_questoes.php?salvo=true');
      exit();

    } else if ($_POST["acao"] === "deletar") {
      $id = $_POST["id"];
      $stmt = $conexao->prepare("DELETE FROM perguntas_jogo WHERE id = :id");
      $stmt->bindParam(':id', $id, PDO::PARAM_INT);
      $stmt->execute();
      // Redireciona de volta para a lista após deletar
      header('Location: CRUD_questoes.php');
      exit();

    } else if ($_POST["acao"] === "redirecionarParaEditar") {
      // Apenas redireciona com o ID, a busca será feita na página de edição
      $id = $_POST["id"];
      header('Location: atualizar_questao.php?id=' . intval($id));
      exit();

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
        $imagem = file_get_contents($_FILES["imagem"]["tmp_name"]);
        $imagemTipo = $_FILES["imagem"]["type"];
        if (substr($imagemTipo, 0, 5) == "image"){
          $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel=:nivel, tipo=:tipo, comando=:comando, imagem=:imagem, alternativa1=:alternativa1, alternativa2=:alternativa2, alternativa3=:alternativa3, alternativa4=:alternativa4, dica=:dica WHERE id =:id");
          $stmt->bindParam(':imagem', $imagem, PDO::PARAM_LOB);
        } else {
          die("Erro, tipo de arquivo não é imagem!");
        }
      } else if(isset($_POST["excluir"]) && $_POST["excluir"] == "sim"){
        $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel=:nivel, tipo=:tipo, comando=:comando, imagem=NULL, alternativa1=:alternativa1, alternativa2=:alternativa2, alternativa3=:alternativa3, alternativa4=:alternativa4, dica=:dica WHERE id =:id");
      } else {
        $stmt = $conexao->prepare("UPDATE perguntas_jogo SET nivel=:nivel, tipo=:tipo, comando=:comando, alternativa1=:alternativa1, alternativa2=:alternativa2, alternativa3=:alternativa3, alternativa4=:alternativa4, dica=:dica WHERE id =:id");
      }
      $stmt->bindParam(':id', $id, PDO::PARAM_INT);
      $stmt->bindParam(':nivel', $nivel);
      $stmt->bindParam(':tipo', $tipo);
      $stmt->bindParam(':comando', $comando);
      $stmt->bindParam(':alternativa1', $alternativa1);
      $stmt->bindParam(':alternativa2', $alternativa2);
      $stmt->bindParam(':alternativa3', $alternativa3);
      $stmt->bindParam(':alternativa4', $alternativa4);
      $stmt->bindParam(':dica', $dica);
      $stmt->execute();

      header('Location: CRUD_questoes.php?salvo=true');
      exit();
    }
  } catch (PDOException $erro) {
    // Em um ambiente de produção, logue o erro em vez de exibi-lo.
    die("Erro no banco de dados: ".$erro->getMessage());
  }
?>