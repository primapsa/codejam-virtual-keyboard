if(!localStorage.currenLang) localStorage.currenLang = 'en';
let altPressed = false;
let capsLockEnabled = false;
let shiftPressed = false;
let lang = localStorage.currenLang;
let secondLang;

lang === 'en' ? secondLang = 'ru' : secondLang = 'en';
document.body.insertAdjacentHTML("afterbegin",'<div class="wrapper" id="wrapper"><textarea  class="area" id="result" rows="5" cols="30"></textarea><div class="keyboard" id="keyboard"></div>');
     for (let i = 0; i < config.length; i++){
      let divLine = document.createElement('div');
      divLine.classList.add('line');
      for(let j = 0; j < config[i].length; j++){
        let divKey = document.createElement('div');     
        divKey.classList.add('key');   
        divKey.classList.add(`key-${config[i][j]['key']}`);    
        divKey.insertAdjacentHTML('afterbegin',`<div class="${config[i][j].key} show">
        <span class="${lang} lower active">${config[i][j][lang+' lower']}</span>
        <span class="${lang} upper disabled">${config[i][j][lang+' upper']}</span></div>
        <div class="${config[i][j].key} disabled">
        <span class="${secondLang} lower active">${config[i][j][secondLang+' lower']}</span>
        <span class="${secondLang} upper disabled">${config[i][j][secondLang+' upper']}</span></div>`);
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
    let localLang = keyboard.querySelector('.show');
    localLang = localLang.querySelector('span');  
    localStorage.currenLang =  localLang.classList[0];   

}

function keyLightOn (active) {    
    
    active.closest('.key').classList.add('clicked');
    
}

function keyLightOff (active) {    
    
    active.closest('.key').classList.remove('clicked');
    
}

function capsLetters(active){
   
    if(capsLockEnabled) {
        keyLightOff (active);
        capsLockEnabled = false;
    }else {
        keyLightOn(active);
        capsLockEnabled = true;
    }
    
        
    let bigLetter = keyboard.querySelectorAll('.show');
    for (let i = 0; i < bigLetter.length; i++) {       
        let firstChildLetter = bigLetter[i].children[0].classList[2]
        let secondChildLetter = bigLetter[i].children[1].classList[2]
        bigLetter[i].children[0].classList.add(secondChildLetter);
        bigLetter[i].children[0].classList.remove(firstChildLetter);
        bigLetter[i].children[1].classList.add(firstChildLetter);
        bigLetter[i].children[1].classList.remove(secondChildLetter);
    }
}

function shiftLetters(){
    if(shiftPressed) {
        shiftPressed = false;
    }else {
        shiftPressed = true;
    }

    let bigLetter = keyboard.querySelectorAll('.show');
    for (let i = 0; i < bigLetter.length; i++) {       
        let firstChildLetter = bigLetter[i].children[0].classList[2]
        let secondChildLetter = bigLetter[i].children[1].classList[2]
        bigLetter[i].children[0].classList.add(secondChildLetter);
        bigLetter[i].children[0].classList.remove(firstChildLetter);
        bigLetter[i].children[1].classList.add(firstChildLetter);
        bigLetter[i].children[1].classList.remove(secondChildLetter);
    }
}

function printLetter(active, code) {
  
    let letterCase = 'lower';
    if(capsLockEnabled || shiftPressed){
        letterCase = 'upper';
    }
  
    let printActive = active.querySelector('.active').innerText;
    if(controls.indexOf(code) !== -1){
        switch(code){
            case 'Tab':
                result.value += '  ';                    
                break;
            case ('Backspace'):
                result.value = result.value.substr(0, result.value.length - 1);
                break;
            case ('Enter'):
                result.value += '\n';   
            case ('Space'):
                result.value += ' ';      
        }
    }else {
    result.value += printActive;
    }
   
}

function pressedUp (event){
    let eventCode = event.code;
    let active = keyboard.querySelector(`.${eventCode}.show`);    

    if(eventCode !== 'CapsLock') {

        keyLightOn(active);
    }    
   
    if(eventCode === 'AltLeft'){
        altPressed = true;
    }
    if((eventCode === 'ControlLeft') && altPressed ){
        changeLang();
    }
    if(eventCode === 'CapsLock'){
        capsLetters(active);
    }
    if((eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') && shiftPressed === false){
        shiftLetters();
    }
   
     printLetter(active, eventCode);
}

function pressedDown(event){
    let eventCode = event.code;
    let active = keyboard.querySelector(`.${eventCode}`);   
   
   if(eventCode !== 'CapsLock'){
    keyLightOff(active);
    }
    if(eventCode === 'AltLeft'){
        altPressed = false;
    }
    if(eventCode === 'ShiftLeft' || eventCode === 'ShiftRight' ){
        shiftLetters();
    }

}
function mouseClickUp(event) {   
     let target = event.target.closest('div') ;
     keyLightOff(target);
     printLetter(target, target.classList[0]);   
}

function mouseClickDown(event) {   
    let target = event.target.closest('div') ;
    keyLightOn(target);
}

document.addEventListener('keydown', pressedUp);
document.addEventListener('keyup', pressedDown);
let keyListener = keyboard.querySelectorAll('.key');
for(let i = 0; i < keyListener.length; i++){
    keyListener[i].addEventListener('mouseup', mouseClickUp);
    keyListener[i].addEventListener('mousedown', mouseClickDown);
}

 
   

