const validSelectors = ['document', 'title', 'subtitle', 'menu-button', 'command', 'answer-button', 'help-button'];
for (let i = 0; i < configuracoes.length; i++) {
    const config = configuracoes[i];
    console.log(config.selector);
    const isSelectorValid = validSelectors.includes(config.selector);
    if (isSelectorValid) {
        switch (config.selector) {
            case 'document':
                // Tratamento para o fundo e para a fonte:
                document.querySelector("body").style.backgroundImage = 'none';
                document.querySelector("body").style.backgroundColor = config.backgroundColor;
                document.querySelector("body").style.fontFamily = config.fontFamily;
                break;
            case 'title':
                // Tratamento para o título:
                document.querySelector(".game-title").innerText = config.text;
                break;
            case 'subtitle':
                // Tratamento para subtitulo:
                document.querySelector(".game-subtitle").innerText = config.text;
                break;
            case 'menu-button':
                // Tratamento para botões:
                const menuButtons = document.querySelectorAll('.btn-menu');
                menuButtons.forEach(button => {
                    // Cor do botão:
                    button.style.backgroundColor = config.backgroundColor;
                    // Cor da borda do botão:
                    button.style.borderColor = config.borderColor;
                    // Cor da letra do botão:
                    button.style.color = config.color;
                });
                break;
            case 'command':
                document.querySelector('.question-command').style.color = config.color;
                break;
            case 'answer-button':
                const answerButtons = document.querySelectorAll('.btn-answer');
                answerButtons.forEach(button => {
                    // Cor do botão:
                    button.style.backgroundColor = config.backgroundColor;
                    // Cor da borda do botão:
                    button.style.borderColor = config.borderColor;
                    // Cor da letra do botão:
                    button.style.color = config.color;
                });
                break;
            case 'help-button':
                const helpButtons = document.querySelectorAll('.btn-help');
                helpButtons.forEach(button => {
                    button.style.backgroundColor = config.backgroundColor;
                    button.style.borderColor = config.borderColor;
                    button.style.color = config.color;
                });
                break;
        }
    }
}
