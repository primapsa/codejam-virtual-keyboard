document.body.insertAdjacentHTML("afterbegin",'<div class="wrapper" id="wrapper"><textarea  class="area" id="result" rows="5" cols="30"></textarea><div class="keyboard" id="keyboard"></div>');
     for (let i = 0; i < config.length; i++){
      let divLine = document.createElement('div');
      divLine.classList.add('line');
      for(let j = 0; j < config[i].length; j++){
        let divKey = document.createElement('div');      
        divKey.classList.add('key');   
        divKey.classList.add(`key-${config[i][j]['key']}`);    
        divKey.insertAdjacentHTML('afterbegin',`<div class="${config[i][j].key} show">
        <span class="en lower active">${config[i][j]['en lower']}</span>
        <span class="en upper disabled">${config[i][j]['en upper']}</span></div>
        <div class="${config[i][j].key} disabled"><span class="ru lower active">${config[i][j]['ru lower']}</span>
        <span class="ru upper disabled">${config[i][j]['ru upper']}</span></div>`);
        divLine.append(divKey);
      }   
      keyboard.append(divLine);   
  }
wrapper.append(keyboard);

function changeLang(){
    let currentLang =  keyboard.querySelectorAll('.key');       
    for (let i = 0; i < currentLang.length; i++){       
            let firstChildLang = currentLang[i].children[0].classList[1];
            let secondChildLanf = currentLang[i].children[1].classList[1];
            currentLang[i].children[0].classList.remove(firstChildLang);
            currentLang[i].children[0].classList.add(secondChildLanf);
            currentLang[i].children[1].classList.remove(secondChildLanf);
            currentLang[i].children[1].classList.add(firstChildLang);       
    }
}
function keyLightOn (active) {    
    
    active.closest('.key').classList.add('clicked');
    
}

function keyLightOff (active) {    
    
    active.closest('.key').classList.remove('clicked');
    
}