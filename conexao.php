<?php
function getConexao(): PDO
{
    static $conexao = null;

    if ($conexao === null) {
        try {
            $dsn = 'mysql:host=localhost;dbname=st_botanik';
            $user = 'root';
            $password = '';
            $conexao = new PDO($dsn, $user, $password);
            $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conexao->exec("set names utf8");
        } catch (PDOException $erro) {
            // Em produção, é melhor logar o erro do que exibi-lo na tela.
            die("Erro na conexão: " . $erro->getMessage());
        }
    }
    return $conexao;
}