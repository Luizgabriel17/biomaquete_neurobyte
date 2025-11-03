const fases = {
    1: [
      {q:'O que são neurônios?',a:'Células especializadas em transmitir informação',b:'Células que brilham no cérebro',certa:'a'},
      {q:'Onde os neurônios estão?',a:'No sistema nervoso',b:'No Crânio',certa:'a'}
    ],
    2: [
      {q:'O que é sinapse?',a:'A conexão entre neurônios',b:'A membrana celular',certa:'a'},
      {q:'O que passa pela sinapse?',a:'Neurotransmissores',b:'Açúcar',certa:'a'}
    ],
    3: [
      {q:'Neurotransmissores são:',a:'Substâncias químicas de comunicação',b:'Substâncias biológicas de transporte',certa:'a'},
      {q:'Exemplo de neurotransmissor:',a:'Dopamina',b:'Testosterona',certa:'a'}
    ]
  };
  
  let faseAtual=1;
  let acertos=0;
  let indice=0;
  
  function carregar(){
    const f=fases[faseAtual];
    const p=f[indice];
    document.getElementById('pergunta').innerText=p.q;
    document.getElementById('opcaoA').innerText=p.a;
    document.getElementById('opcaoB').innerText=p.b;
    document.getElementById('proxima').disabled=true;
    document.getElementById('opcaoA').style.pointerEvents='auto';
    document.getElementById('opcaoB').style.pointerEvents='auto';
    document.getElementById('opcaoA').classList.remove('correto','errado');
    document.getElementById('opcaoB').classList.remove('correto','errado');
  }
  
  function responder(x){
    const f = fases[faseAtual][indice];
    const correta = f.certa;
    const opt = document.getElementById('opcao'+x.toUpperCase());
    
    // trava cliques
    opt.style.pointerEvents = 'none';
  
    if(x === correta){
      acertos++;
      document.getElementById('score').innerText = acertos;
  
      // toca som de acerto
      const somAcerto = new Audio('../AUDIO/yes.mp3');
      somAcerto.play();
  
      opt.classList.add('correto');
    } else {
      // toca som de erro
      const somErro = new Audio('../AUDIO/no.mp3');
      somErro.play();
  
      opt.classList.add('errado');
    }
  
    document.getElementById('proxima').disabled = false;
  }
  
  
  document.getElementById('proxima').onclick = ()=>{
    indice++;
    if(indice>=fases[faseAtual].length){
      faseAtual++;
      indice=0;
      document.getElementById('barra').style.width=((faseAtual-1)*33)+'%';
    }
    if(faseAtual>3){
      document.getElementById('barra').style.width='100%';
      alert('🎉 Fim! Você aprendeu tudo!');
      return;
    }
    carregar();
  };
  
  document.getElementById('reset').onclick = ()=>{
    faseAtual=1;
    acertos=0;
    indice=0;
    document.getElementById('score').innerText=acertos;
    document.getElementById('barra').style.width='0%';
    carregar();
  };
  
  window.onload = ()=>{document.getElementById('barra').style.width='0%';carregar();};
  