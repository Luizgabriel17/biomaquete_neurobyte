const fases = {
  1: [
    {q:'O que é um neurônio?',
     a:'Uma célula especializada em transmitir impulsos nervosos no sistema nervoso',
     b:'Uma célula que apenas transporta oxigênio no sangue',
     c:'Uma célula que forma os músculos esqueléticos',
     d:'Um tipo de tecido conjuntivo',
     certa:'a'},

    {q:'Onde os neurônios estão localizados?',
     a:'Somente no cérebro',
     b:'Apenas na medula espinhal',
     c:'Em todo o sistema nervoso — cérebro, medula e nervos periféricos',
     d:'Somente nos órgãos dos sentidos',
     certa:'c'},

    {q:'Qual é a principal função do corpo celular do neurônio?',
     a:'Gerar o impulso nervoso e transmiti-lo',
     b:'Controlar as atividades vitais da célula e integrar as informações recebidas',
     c:'Armazenar neurotransmissores e íons',
     d:'Revestir o axônio com mielina',
     certa:'b'},

    {q:'O que são dendritos?',
     a:'Ramificações que recebem estímulos e sinais de outros neurônios',
     b:'Partes responsáveis por liberar neurotransmissores',
     c:'Filamentos que isolam o axônio',
     d:'Moléculas químicas do sistema nervoso',
     certa:'a'},

    {q:'Qual é a função do axônio?',
     a:'Receber estímulos de outros neurônios',
     b:'Conduzir o impulso nervoso do corpo celular até outras células',
     c:'Produzir neurotransmissores',
     d:'Atuar como receptor sensorial',
     certa:'b'}
  ],

  2: [
    {q:'O que é uma sinapse?',
     a:'A conexão entre dois neurônios onde ocorre a transmissão do impulso nervoso',
     b:'A membrana que envolve o corpo celular do neurônio',
     c:'Um tipo de neurônio motor',
     d:'Uma substância química cerebral',
     certa:'a'},

    {q:'O que acontece na sinapse química?',
     a:'O impulso nervoso é convertido em sinal químico através dos neurotransmissores',
     b:'O impulso passa diretamente sem substâncias químicas',
     c:'A bainha de mielina se regenera',
     d:'Os dendritos liberam oxigênio',
     certa:'a'},

    {q:'O que são neurotransmissores?',
     a:'Células que armazenam impulsos nervosos',
     b:'Substâncias químicas que transmitem informações entre neurônios',
     c:'Íons que se acumulam nos músculos',
     d:'Partes do axônio responsáveis por proteger o neurônio',
     certa:'b'},

    {q:'Qual é a função da bainha de mielina?',
     a:'Proteger o corpo celular e desacelerar o impulso nervoso',
     b:'Acelerar a transmissão dos impulsos nervosos pelo axônio',
     c:'Atuar na produção de neurotransmissores',
     d:'Permitir a comunicação direta entre neurônios',
     certa:'b'},

    {q:'O que ocorre quando há destruição da bainha de mielina?',
     a:'Os impulsos nervosos ficam mais rápidos',
     b:'O cérebro aumenta a produção de dopamina',
     c:'A condução nervosa fica lenta e surgem dificuldades motoras',
     d:'A sinapse se torna mais eficiente',
     certa:'c'}
  ]
};


let faseAtual = 1;
let acertos = 0;
let indice = 0;

function carregar(){
  const f = fases[faseAtual];
  const p = f[indice];
  document.getElementById('pergunta').innerText = p.q;

  document.getElementById('opcaoA').innerText = p.a;
  document.getElementById('opcaoB').innerText = p.b;
  document.getElementById('opcaoC').innerText = p.c;
  document.getElementById('opcaoD').innerText = p.d;

  document.getElementById('proxima').disabled = true;
  ['A','B','C','D'].forEach(id=>{
    const el = document.getElementById('opcao'+id);
    el.style.pointerEvents = 'auto';
    el.classList.remove('correto','errado');
  });
}

function responder(x){
  const f = fases[faseAtual][indice];
  const correta = f.certa;
  const opt = document.getElementById('opcao'+x.toUpperCase());

  ['A','B','C','D'].forEach(id=>{
    document.getElementById('opcao'+id).style.pointerEvents = 'none';
  });

  if(x === correta){
    acertos++;
    document.getElementById('score').innerText = acertos;
    const somAcerto = new Audio('../AUDIOS/yes.mp3');
    somAcerto.play();
    opt.classList.add('correto');
  } else {
    const somErro = new Audio('../AUDIOS/no.mp3');
    somErro.play();
    opt.classList.add('errado');
  }

  document.getElementById('proxima').disabled = false;
}

document.getElementById('proxima').onclick = ()=>{
  indice++;
  if(indice >= fases[faseAtual].length){
    faseAtual++;
    indice = 0;
    document.getElementById('barra').style.width = ((faseAtual-1)*50)+'%';
  }
  if(faseAtual > 2){
    document.getElementById('barra').style.width = '100%';
    mostrarMensagemFinal();
    return;
  }
  carregar();
};

document.getElementById('reset').onclick = ()=>{
  faseAtual = 1;
  acertos = 0;
  indice = 0;
  document.getElementById('score').innerText = acertos;
  document.getElementById('barra').style.width = '0%';
  carregar();
};

function mostrarMensagemFinal(){
  let mensagem = '';
  const total = 10;
  const porcentagem = (acertos / total) * 100;

  if(porcentagem === 100){
    mensagem = '🎉 Incrível! Você acertou todas as perguntas! Seu cérebro está tinindo de sinapses!';
  } else if(porcentagem >= 80){
    mensagem = '👏 Excelente! Você entende muito bem sobre neurônios e sinapses!';
  } else if(porcentagem >= 50){
    mensagem = '😊 Bom trabalho! Continue estudando para dominar o sistema nervoso!';
  } else {
    mensagem = '🤔 Que tal revisar um pouco mais? Você vai melhorar rapidinho!';
  }

  alert(`${mensagem}\n\nPontuação final: ${acertos} de ${total}`);
}

window.onload = ()=>{
  document.getElementById('barra').style.width = '0%';
  carregar();
};
