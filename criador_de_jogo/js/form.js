const botaoAdicionar = document.querySelector('#adicionar-paciente')
const botaoBaixar = document.querySelector('#salvar-tabela')
const botaoCarregar = document.querySelector('#carregar-tabela')

let tabela = document.querySelector('#tabela-pacientes')


botaoBaixar.addEventListener('click', converteTabelaParaArrayObjetos)
botaoCarregar.addEventListener('change', onChange)

function onChange(event) {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
  var obj = JSON.parse(event.target.result);
  perguntasEmLista = transformarEmListaDePerguntas(obj)
  
  while(tabela.firstChild) {
    tabela.removeChild(tabela.lastChild)
  }

  for(let i = 0; i < perguntasEmLista.length; i++) {
    adicionaPacienteNaTabelAlternativo(perguntasEmLista[i])
  }

}

function transformarEmListaDePerguntas (perguntasObjeto){
  perguntasEmLista = []

  for (var i = 1; i <= 4; i++) {
    for (var j = 0; j < perguntasObjeto[i].length; j++) {
      perguntasEmLista.push(perguntasObjeto[i][j])
    }
  }
  return perguntasEmLista

}

botaoAdicionar.addEventListener('click', function (event) {
  event.preventDefault()

  let form = document.querySelector('#form-adiciona')
  let paciente = obtemPacienteDoFormulario(form)

  formularioValido = validaFormulario(form)

  if (!formularioValido) {
    console.log("Formulário incorretamente preenchido!")
    return
  }

  adicionaPacienteNaTabela(paciente)

  form.reset()

  let mensagensErro = document.querySelector('#mensagens-erro')
  mensagensErro.innerHTML = ''
})

function validaFormulario (form) {
  nivelValido = ['1', '2', '3', '4'].includes(form.nivel.value)
  tipoValido = form.tipo.value != ''
  comandoValido = form.comando.value != ''
  alternativaCorretaValido = form.alternativaCorreta.value != ''
  alternativaIncorreta1Valido = form.alternativaIncorreta1.value != ''
  alternativaIncorreta2Valido = form.alternativaIncorreta2.value != ''
  alternativaIncorreta3Valido = form.alternativaIncorreta3.value != ''
  dicaValido = form.dica.value != ''

  if (!nivelValido || !tipoValido || !comandoValido || !alternativaCorreta || !alternativaIncorreta1Valido || !alternativaIncorreta2Valido || !alternativaIncorreta3Valido || !dicaValido) {
    return false
  } else {
    return true
  }
}

function gerarID(form) {
  idsExistentes = document.querySelectorAll('.info-id')
  let id = 1
  id = tentarId(id)

  return id
}

function tentarId (id) {
  for(let i = 0; i < idsExistentes.length; i++){
    if (parseInt(idsExistentes[i].innerText) == id) {
      return tentarId(id + 1)
    }
  }
  return id
}

function obtemPacienteDoFormulario (form) {
  const paciente = {
    id: gerarID(form),
    nivel: form.nivel.value,
    tipo: form.tipo.value,
    comando: form.comando.value,
    alternativaCorreta: form.alternativaCorreta.value,
    alternativaIncorreta1: form.alternativaIncorreta1.value,
    alternativaIncorreta2: form.alternativaIncorreta2.value,
    alternativaIncorreta3: form.alternativaIncorreta3.value,
    dica: form.dica.value
  }

  return paciente
}

function montaTrAlternativo (questao) {
  const pacienteTr = document.createElement('tr')
  pacienteTr.classList.add('paciente')
  pacienteTr.id = 'questao' + questao.id

  pacienteTr.appendChild(montaTd(questao.id, 'info-id'))
  pacienteTr.appendChild(montaTd(questao.nivel, 'info-nivel'))
  pacienteTr.appendChild(montaTd(questao.tipo, 'info-tipo'))
  pacienteTr.appendChild(montaTd(questao.comando, 'info-comando'))
  pacienteTr.appendChild(montaTd(questao.alternativa1, 'info-alternativa-correta'))
  pacienteTr.appendChild(montaTd(questao.alternativa1, 'info-alternativa-incorreta-1'))
  pacienteTr.appendChild(montaTd(questao.alternativa2, 'info-alternativa-incorreta-2'))
  pacienteTr.appendChild(montaTd(questao.alternativa3, 'info-alternativa-incorreta-3'))
  pacienteTr.appendChild(montaTd(questao.dica, 'info-dica'))

  const td = document.createElement('td')
  td.classList.add('acoes')

  const buttonRemover = document.createElement('button')
  buttonRemover.textContent = 'REMOVER'
  buttonRemover.classList.add('button-remover')

  buttonRemover.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.remove()
  })

  td.appendChild(buttonRemover)

  pacienteTr.appendChild(td)

  return pacienteTr
}

function montaTr (paciente) {
  const pacienteTr = document.createElement('tr')
  pacienteTr.classList.add('paciente')
  pacienteTr.id = 'questao' + paciente.id

  pacienteTr.appendChild(montaTd(paciente.id, 'info-id'))
  pacienteTr.appendChild(montaTd(paciente.nivel, 'info-nivel'))
  pacienteTr.appendChild(montaTd(paciente.tipo, 'info-tipo'))
  pacienteTr.appendChild(montaTd(paciente.comando, 'info-comando'))
  pacienteTr.appendChild(montaTd(paciente.alternativaCorreta, 'info-alternativa-correta'))
  pacienteTr.appendChild(montaTd(paciente.alternativaIncorreta1, 'info-alternativa-incorreta-1'))
  pacienteTr.appendChild(montaTd(paciente.alternativaIncorreta2, 'info-alternativa-incorreta-2'))
  pacienteTr.appendChild(montaTd(paciente.alternativaIncorreta3, 'info-alternativa-incorreta-3'))
  pacienteTr.appendChild(montaTd(paciente.dica, 'info-dica'))

  const td = document.createElement('td')
  td.classList.add('acoes')

  const buttonRemover = document.createElement('button')
  buttonRemover.textContent = 'REMOVER'
  buttonRemover.classList.add('button-remover')

  buttonRemover.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.remove()
  })

  td.appendChild(buttonRemover)

  pacienteTr.appendChild(td)

  return pacienteTr
}

function montaTd (dado, classe) {
  const td = document.createElement('td')
  td.classList.add(classe)
  td.textContent = dado

  return td
}

function adicionaPacienteNaTabela (paciente) {
  const pacienteTr = montaTr(paciente)
  tabela = document.querySelector('#tabela-pacientes')
  tabela.appendChild(pacienteTr)
  tabela = document.querySelector('#tabela-pacientes')
}

function adicionaPacienteNaTabelAlternativo(questao){
  const pacienteTr = montaTrAlternativo(questao)
  tabela = document.querySelector('#tabela-pacientes')
  tabela.appendChild(pacienteTr)
  tabela = document.querySelector('#tabela-pacientes')
}

function converteTabelaParaArrayObjetos () {
  let perguntas = []
  questoesEmTr = tabela.querySelectorAll('tr')

  for (let i = 0; i < questoesEmTr.length; i++) {
      modelo = {
      id: '',
      nivel: '',
      tipo: '',
      comando: '',
      imagem: '',
      alternativa1: '',
      alternativa2: '',
      alternativa3: '',
      alternativa4: '',
      dica: ''
    }

    modelo.id = questoesEmTr[i].querySelector('.info-id').innerText
    modelo.nivel = questoesEmTr[i].querySelector('.info-nivel').innerText
    modelo.tipo = questoesEmTr[i].querySelector('.info-tipo').innerText
    modelo.comando = questoesEmTr[i].querySelector('.info-comando').innerText
    modelo.imagem = ''
    modelo.alternativa1 = questoesEmTr[i].querySelector('.info-alternativa-correta').innerText
    modelo.alternativa2 = questoesEmTr[i].querySelector('.info-alternativa-incorreta-1').innerText
    modelo.alternativa3 = questoesEmTr[i].querySelector('.info-alternativa-incorreta-2').innerText
    modelo.alternativa4 = questoesEmTr[i].querySelector('.info-alternativa-incorreta-3').innerText
    modelo.dica = questoesEmTr[i].querySelector('.info-dica').innerText

    perguntas.push(modelo)
  }
  
  perguntasProntas = {
    1: [],
    2: [],
    3: [],
    4: [],
  }

  for (let i = 0; i < perguntas.length; i++) {
    if (perguntas[i].nivel == 1) {
      perguntasProntas[1].push(perguntas[i])
    } else if (perguntas[i].nivel == 2) {
      perguntasProntas[2].push(perguntas[i])
    } else if (perguntas[i].nivel == 3) {
      perguntasProntas[3].push(perguntas[i])
    } else if (perguntas[i].nivel == 4) {
      perguntasProntas[4].push(perguntas[i])
    }
  }

  perguntasJSON = JSON.stringify(perguntasProntas)

  // download
  let element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(perguntasJSON))
  element.setAttribute('download', 'perguntas.json')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)

}

function carregarTabela(){
  var fr = new FileReader()
  fr.onload=function(){}
}