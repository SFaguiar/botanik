<?php
try {
	$dsn = 'mysql:host=localhost;dbname=botanik';
	$user = 'root';
	$password = '';
	$conexao = new PDO($dsn, $user, $password);
	$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conexao->exec("set names utf8");

} catch (PDOException $erro) {
  echo "Erro na conexão:" . $erro->getMessage();
  
}	
?>