<?php
session_start();
// Limpa todas as variáveis da sessão
$_SESSION = [];
session_destroy();
header("Location: login.php");
?>
exit();