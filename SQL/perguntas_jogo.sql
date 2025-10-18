CREATE TABLE `perguntas_jogo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nivel` TINYINT(5) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `comando` TEXT NOT NULL,
  `imagem` MEDIUMBLOB DEFAULT NULL,
  `alternativa1` VARCHAR(200) NOT NULL,
  `alternativa2` VARCHAR(200) NOT NULL,
  `alternativa3` VARCHAR(200) NOT NULL,
  `alternativa4` VARCHAR(200) NOT NULL,
  `dica` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);