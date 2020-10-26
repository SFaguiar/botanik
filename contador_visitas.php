<?php
require_once "conexao.php";

$ip = $_SERVER['REMOTE_ADDR'];
$data = date("Y-m-d");
$hora = date("H:i");

$select = $conexao->prepare("SELECT * FROM visitas WHERE `ip` = '$ip' AND `data` = '$data' order by `id` DESC;");
$select->execute();
if ($select->rowCount() === 0){
    $select = $conexao->prepare("INSERT INTO `visitas` (`id`, `ip`, `data`, `hora`) VALUES ('', '$ip', '$data', '$hora');");
    $select->execute();
} else {
    $FSelect = $select->fetch(PDO::FETCH_ASSOC);
    $horaDB = strtotime($FSelect['hora']);
    $horaAtual = strtotime($hora);
    $horaDiferenca = $horaAtual - $horaDB;
    if($horaDiferenca > 50){
        $select = $conexao->prepare("INSERT INTO `visitas` (`id`, `ip`, `data`, `hora`) VALUES ('', '$ip', '$data', '$hora');");
        $select->execute();
    }
}