var seletoresValidos = ['documento', 'titulo', 'subtitulo', 'botao-menu', 'comando', 'botao-resposta', 'botao-ajuda'];
for (i = 0; i < configuracoes.length; i++) {
    console.log(configuracoes[i].selector)
    seletorEhValido = seletoresValidos.includes(configuracoes[i].selector);
    if (seletorEhValido) {
        switch (configuracoes[i].selector) {
            case 'documento':
                // Tratamento para o fundo e para a fonte:
                document.querySelector("*").style.backgroundImage = 'none';
                document.querySelector("*").style.backgroundColor = configuracoes[i].backgroundColor;
                document.querySelector("*").style.fontFamily = configuracoes[i].fontFamily;
                break;
            case 'titulo':
                // Tratamento para o título:
                document.getElementById("titulo").innerText = configuracoes[i].text;
                break;
            case 'subtitulo':
                // Tratamento para subtitulo:
                document.getElementById("subtitulo").innerText = configuracoes[i].text;
                break;
            case 'botao-menu':
                // Tratamento para botões:
                const botoesMenu = document.querySelectorAll('.botao-do-menu-principal');
                for (j = 0; j < botoesMenu.length; j++) {
                    // Cor do botão:
                    botoesMenu[j].style.backgroundColor = configuracoes[i].backgroundColor;
                    // Cor da borda do botão:
                    botoesMenu[j].style.borderColor = configuracoes[i].borderColor;
                    // Cor da letra do botão:
                    botoesMenu[j].style.color = configuracoes[i].color;
                }
                break;
            case 'comando':
                document.querySelector('.comando').style.color = configuracoes[i].color;
                break;
            case 'botao-resposta':
                const botoesResposta = document.querySelectorAll('.botao-resposta');
                for (j = 0; j < botoesResposta.length; j++) {
                    // Cor do botão:
                    botoesResposta[j].style.backgroundColor = configuracoes[i].backgroundColor;
                    // Cor da borda do botão:
                    botoesResposta[j].style.borderColor = configuracoes[i].borderColor;
                    // Cor da letra do botão:
                    botoesResposta[j].style.color = configuracoes[i].color;
                }
                break;
            case 'botao-ajuda':
                const botoesAjuda = document.querySelectorAll('.botao-ajuda');
                for (j = 0; j < botoesAjuda.length; j++) {
                    // Cor do botão:
                    botoesAjuda[j].style.backgroundColor = configuracoes[i].backgroundColor;
                    // Cor da borda do botão:
                    botoesAjuda[j].style.borderColor = configuracoes[i].borderColor;
                    // Cor da letra do botão:
                    botoesAjuda[j].style.color = configuracoes[i].color;
                }
                break;
        }
    }
}
