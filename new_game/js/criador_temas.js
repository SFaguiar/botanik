function mudarTexto (idEntrada, idSaida) {
  const texto = document.getElementById(idEntrada).value
  document.getElementById(idSaida).innerText = texto
}

function mudarCorFonte (idEntrada, idSaida) {
  const cor = document.getElementById(idEntrada).value
  document.getElementById(idSaida).style.color = cor
}

function mudarCorFundo (idEntrada, idSaida) {
  const cor = document.getElementById(idEntrada).value
  document.getElementById(idSaida).style.backgroundColor = cor
}

function mudarCorBorda (idEntrada, idSaida) {
  const cor = document.getElementById(idEntrada).value
  document.getElementById(idSaida).style.borderColor = cor
}

function mudarCorCaixas (idEntrada) {
  const cor = document.getElementById(idEntrada).value
  const fundos = document.querySelectorAll('.container')
  console.log(fundos)
  for (let i = 0; i < fundos.length; i++) {
    fundos[i].style.backgroundColor = cor
  }
}

function gerarCodigo () {
  atualizarTemplate()
  const codigoFinal = JSON.stringify(template)
  document.getElementById('texto-resultados').innerText = codigoFinal
}

function atualizarTemplate () {
  // Fundo:
  template[0].backgroundColor = document.getElementById('caixa-mudar-cor-fundo').value

  // Título:
  template[1].color = document.getElementById('caixa-mudar-cor-titulo').value
  template[1].text = document.getElementById('caixa-mudar-texto-titulo').value

  // Subítulo:
  template[2].color = document.getElementById('caixa-mudar-cor-subtitulo').value
  template[2].text = document.getElementById('caixa-mudar-texto-subtitulo').value

  // Botão menu:
  template[3].color = document.getElementById('caixa-mudar-cor-texto-botao-menu').value
  template[3].backgroundColor = document.getElementById('caixa-mudar-cor-fundo-botao-menu').value
  template[3].borderColor = document.getElementById('caixa-mudar-cor-borda-botao-menu').value

  // Comando:
  template[4].color = document.getElementById('caixa-mudar-cor-comando').value

  // Botão resposta:
  template[5].color = document.getElementById('caixa-mudar-cor-texto-botao-resposta').value
  template[5].backgroundColor = document.getElementById('caixa-mudar-cor-fundo-botao-resposta').value
  template[5].borderColor = document.getElementById('caixa-mudar-cor-borda-botao-resposta').value

  // Botão ajuda:
  template[6].color = document.getElementById('caixa-mudar-cor-texto-botao-ajuda').value
  template[6].backgroundColor = document.getElementById('caixa-mudar-cor-fundo-botao-ajuda').value
  template[6].borderColor = document.getElementById('caixa-mudar-cor-borda-botao-ajuda').value
}

function baixar () {
  gerarCodigo()
  let text = document.getElementById('texto-resultados').value
  let element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', 'aparencia.json')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const template = [
  {
    selector: 'documento',
    fontFamily: "'Impact', 'Charcoal', sans-serif",
    backgroundColor: ''
  },
  {
    selector: 'titulo',
    color: '',
    text: ''
  },
  {
    selector: 'subtitulo',
    color: '',
    text: ''
  },
  {
    selector: 'botao-menu',
    backgroundColor: '',
    borderColor: ''
  },
  {
    selector: 'comando',
    color: ''
  },
  {
    selector: 'botao-resposta',
    backgroundColor: '',
    borderColor: ''
  },
  {
    selector: 'botao-ajuda',
    backgroundColor: '',
    borderColor: ''
  }
]
