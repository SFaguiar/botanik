# botanik
Botanik é um jogo digital de perguntas e respostas sobre botânica para ser jogado online em um navegador qualquer, seja pelo celular, tablet, laptop ou desktop.

O jogo foi concebido pela professora Sílvia Mardegan, do Instituto de Ciências Biológicas (ICB) da Universidade Federal do Pará para auxiliar alunos do ensino fundamental e médio brasileiro no aprendizado da matéria de botânica.

Features
--------

Para usuários comuns:
- Banco da dados com grande quantidade de questões;
- Compatibilidade e portabilidade para rodar em praticamente qualquer dispositivo com um navegador moderno;
- Questões com imagens que podem receber zoom;
- Design confortável;
- Sistema de ajudas; e
- Modos de jogo para sala de aula ou sozinho.

Para professores:
- Banco de dados que pode ser constantemente alimentado com mais questões;
- Editor e visualizador de questões; e
- Livre acesso ao vasto banco de questões.


Para programadores:
- Código aberto feito com HTML, CSS, JavaScript e PHP;
- Programa escrito com funções e nomes em português;
- Código fácil de ler; e
- Possibilidade de contribuição.

Instalação
------------

Para instalar, você precisara um servidor com compatibilidade com PHP e um banco de dados MySQL. O pacote utilizado para a criação do projeto (portanto o recomendado foi o XAMPP).

No banco de dados, é necessário que o nome seja "st_botanik" com tabelas chamadas "perguntas_jogo", "visitas" e "login", todos sem áspas. 

Abra o arquivo "conexao.php" e atribua às variáveis $user e $password o nome do usuário e para a senha do seu PHPMyAdmin respectivamente. Por padrão, o usuário e a senha são os seguintes:

$user = 'root';
$password = '';

O DSN padrão costuma ser:

$dsn = 'mysql:host=localhost;dbname=st_botanik';

A tabela "perguntas_jogo" deve apresentar a seguinte estrutura para funcionar corretamente:

CREATE TABLE `perguntas_jogo` (
  `id` int(11) NOT NULL,
  `nivel` tinyint(5) NOT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `comando` text COLLATE utf8_unicode_ci NOT NULL,
  `imagem` mediumblob DEFAULT NULL,
  `alternativa1` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `alternativa2` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `alternativa3` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `alternativa4` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dica` varchar(100) COLLATE utf8_unicode_ci NOT NULL
)

Também será necessário a tabela de visitas, para rastrear as visitações ao site:

CREATE TABLE `visitas` (
  `id` int(11) NOT NULL,
  `ip` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `data` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `hora` varchar(30) COLLATE utf8_unicode_ci NOT NULL
)

E também a tabela de logins, para os logins que terão acesso ao CRUD:

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `senha` varchar(32) COLLATE utf8_unicode_ci NOT NULL
)

Basta executar esses comandos no banco de dados para a criação das tabelas. O SQL para a criação da tabela está disponível na pasta "SQL".

Após todo o setup, basta ligar o servidor e o banco de dados que o jogo deve funcionar normalmente.

Contribua
----------

- Issue Tracker: github.com/RFLMNaguiar/botanik/issues
- Source Code: github.com/RFLMNaguiar/botanik

Suporte
-------

Se você encontrar algum bug, por favor mande-nos alguma mensagem!
E-mail: RFLMNaguiar@gmail.com

(Samuel Aguiar, desenvolvedor do jogo e aluno de Ciência da Computação da UFPA)

Licença
-------

Esse projeto atualmente (09/11/2020) não apresenta nenhuma licença, portanto é de uso livre para edição e reprodução.

Créditos
-------

Desenvolvedores:
Járlesson Gama A. Júnior, Samuel Figueira Aguiar

Orientadores:
Prof. Dr. Dionne Cavalcante
Profa. Dra. Silvia Mardegan

Imagem de fundo:
Eder Muniz (https://edermunizz.itch.io/free-pixel-art-forest)

Desehista:
João Felipe S. (freelancer)
