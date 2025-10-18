<?php
    require_once "conexao.php";
    $id = $_POST["id"];
    $escolha = $_POST["escolha"];

    $stmt = $conexao->prepare("SELECT COUNT(*) FROM `estatisticas` WHERE `id` = '$id'");
    $stmt->execute();
    $numIds = $stmt->fetchColumn();
    
    if ($numIds != 0) {
        switch($escolha){
            case "a":
                $stmt = $conexao->prepare("UPDATE `estatisticas` SET escolha_a = escolha_a + 1 WHERE id = '$id'");
                $conexao->exec($stmt->queryString);
                break;
            case "b":
                $stmt = $conexao->prepare("UPDATE `estatisticas` SET escolha_b = escolha_b + 1 WHERE id = '$id'");
                $conexao->exec($stmt->queryString);
                break;
            case "c":
                $stmt = $conexao->prepare("UPDATE `estatisticas` SET escolha_c = escolha_c + 1 WHERE id = '$id'");
                $conexao->exec($stmt->queryString);
                break;
            case "d":
                $stmt = $conexao->prepare("UPDATE `estatisticas` SET escolha_d = escolha_d + 1 WHERE id = '$id'");
                $conexao->exec($stmt->queryString);
                break;
            }
        } else {
            switch($escolha){
                case "a":
                    $stmt = $conexao->prepare("INSERT INTO `estatisticas` (id, escolha_a, escolha_b, escolha_c, escolha_d) VALUES ($id, 1, 0, 0, 0)");
                    $conexao->exec($stmt->queryString);
                    break;
                case "b":
                    $stmt = $conexao->prepare("INSERT INTO `estatisticas` (id, escolha_a, escolha_b, escolha_c, escolha_d) VALUES ($id, 0, 1, 0, 0)");
                    $conexao->exec($stmt->queryString);
                    break;
                case "c":
                    $stmt = $conexao->prepare("INSERT INTO `estatisticas` (id, escolha_a, escolha_b, escolha_c, escolha_d) VALUES ($id, 0, 0, 1, 0)");
                    $conexao->exec($stmt->queryString);
                    break;
                case "d":
                    $stmt = $conexao->prepare("INSERT INTO `estatisticas` (id, escolha_a, escolha_b, escolha_c, escolha_d) VALUES ($id, 0, 0, 0, 1)");
                    $conexao->exec($stmt->queryString);
                    break;
            }
    }
