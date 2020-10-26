<?php
    session_start();
    require_once "conexao.php";
?>

<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <title>Login - botanik.ufpa.br</title>
        <style>
            main {
                position: absolute;
                width: 30%;
                background: #F0F0F0;
                border-radius: .25em .25em .4em .4em;
                text-align: center;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                display: block;
                margin-left: auto;
                margin-right: auto;
                padding: 2%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        </style>
    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-sm navbar-light" style="background-color: #203c0b">
				<div class="container">
                    <h3>BOTANIK</h3>
					<div class="collapse navbar-collapse">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<a href="index.php" class="">VOLTAR AO JOGO</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
        </header>
        <main>
            <div class="header-container">
                <h1>Faça o login para continuar.</h1>
            </div>
            <div class="form-container form-group">
                <form action="validar_login.php" method="POST" name="formC" enctype="multipart/form-data" >
                    <label for="email" class="">Email</label>
                    <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
                    <br>
                    <label for="senha" class="">Senha</label>
                    <input type="password" name="senha" id="senha" class="form-control" placeholder="Senha" required>
                    <br>
                    <button class="btn btn-lg btn-danger btn-block" type="submit">Acessar</button>
                </form>
                <?php
                if(isset($_SESSION['nao_autenticado'])){
                ?>
                <p>ERRO: USUÁRIO OU SENHA INVÁLIDO(S)</p>
                <?php 
                }
                unset($_SESSION['nao_autenticado']);?>
            </div>
        </main>
</html>