<?php
session_start();
// Limpa todas as variáveis da sessão
$_SESSION = [];
// Destrói a sessão e o cookie de sessão
session_destroy();
header("Location: login.php");
exit();