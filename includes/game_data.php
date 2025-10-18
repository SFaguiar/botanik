<?php
// includes/game_data.php

/**
 * Busca e prepara a lista de perguntas para um determinado nível.
 *
 * @param int $nivel O nível das perguntas a serem buscadas.
 * @param PDO $conexao O objeto de conexão com o banco de dados.
 * @return array A lista de perguntas.
 */
function prepararListaDePerguntas(int $nivel, PDO $conexao): array
{
    $stmt = $conexao->prepare("SELECT * FROM `perguntas_jogo` WHERE `nivel` = :nivel");
    $stmt->bindParam(':nivel', $nivel, PDO::PARAM_INT);
    $stmt->execute();
    $lista = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Substitui o binário da imagem por um placeholder para não sobrecarregar o JSON inicial.
    foreach ($lista as &$item) {
        if (!empty($item['imagem'])) {
            $item['imagem'] = "1M4G3M"; 
        }
    }
    return $lista;
}

/**
 * Busca todas as imagens do banco e as prepara para serem embutidas no HTML.
 *
 * @param PDO $conexao O objeto de conexão com o banco de dados.
 * @return array Uma lista de imagens prontas para o HTML.
 */
function prepararImagens(PDO $conexao): array
{
    $imagens = [];
    $stmt = $conexao->prepare("SELECT id, imagem FROM perguntas_jogo WHERE imagem IS NOT NULL AND imagem != ''");
    $stmt->execute();
    while ($rs = $stmt->fetch(PDO::FETCH_OBJ)) {
        $imagens[] = [
            'id' => htmlspecialchars($rs->id, ENT_QUOTES, 'UTF-8'),
            'src' => 'data:image/jpeg;base64,' . base64_encode($rs->imagem)
        ];
    }
    return $imagens;
}

// --- Lógica principal de busca de dados ---
require_once __DIR__ . '/conexao.php';
$conexao = getConexao();

$perguntasProntas = [
    1 => prepararListaDePerguntas(1, $conexao),
    2 => prepararListaDePerguntas(2, $conexao),
    3 => prepararListaDePerguntas(3, $conexao),
    4 => prepararListaDePerguntas(4, $conexao),
];

$imagensProntas = prepararImagens($conexao);

?>
