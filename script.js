let device = document.getElementById('device');
let bufer = null;
let flagSign = null;
let result = null;
let flagNewItem = false;
let solve = false;
let isResult = false;
let firstTry = true;
let end = false;
let smallFont = false;
let equalOn = false;

function getResult(flagSign, bufer, result) {
    if (flagSign === '+') return result + bufer;
    if (flagSign === '-') return result - bufer;
    if (flagSign === '*') return result * bufer;
    if (flagSign === '/') return result / bufer;
}

function selectSign(e) {
    switch (e.target.id) {
        case 'plus':
            flagSign = "+";
            break;
        case 'minus':
            flagSign = "-";
            break;
        case 'multy':
            flagSign = "*";
            break;
        case 'divide':
            flagSign = "/";
            break;
        default:
            flagSign = null;
    }
}

device.onclick = e => {
    let text = document.getElementById("text");
    let display = document.querySelector('.display');
    let C = document.getElementById("C");
    if (e.target.className === 'but num left' && e.target.id !== 'C' && !(/[.]/.test(text.innerHTML) && e.target.id == 'point')) {
        if (equalOn) {
            text.innerHTML = '';
            equalOn = false;
        }
        if (text.innerHTML === '.') text.innerHTML = '0.';
        if (text.innerHTML === '0') text.innerHTML = '';
        if (flagNewItem || isResult) {
            if (firstTry) {
                result = text.innerHTML;
                firstTry = false;
            }
            text.innerHTML = '';
            flagNewItem = false;
            solve = true;
            isResult = false;
        }
        C.innerHTML = 'CE';
        if (text.innerHTML.length < 22) {
            text.innerHTML = text.innerHTML + e.target.innerHTML;
            bufer = +text.innerHTML;
        } else {
            console.log('Число символов превышает допустимое значение')
        }

        if (text.innerHTML === '.') text.innerHTML = '0.';
    } else {
        if (e.target.id === 'plus' || e.target.id === 'minus' || e.target.id === 'multy' || e.target.id === 'divide') {
            if (solve && !end) {
                result = getResult(flagSign, bufer, result);
                text.innerHTML = result;
                bufer = result;
                flagNewItem = false;
                solve = false;
                isResult = true;
                selectSign(e);
            }
            if (!flagNewItem && !end) { 
                selectSign(e);
                flagNewItem = true;
            }
            if (flagNewItem && !end) {
                selectSign(e);
            }
            if (end) {
                selectSign(e);
                end = false;
                flagNewItem = true;
            }
        }
        if (e.target.id === 'equally') {
            if (flagSign !== null) {
                if (firstTry) {
                    result = text.innerHTML;
                    equalOn = true;
                }
                result = getResult(flagSign, bufer, result);
                text.innerHTML = "";
                text.innerHTML = result;
                end = true;
                solve = false;
                equalOn = true;
            }
            if (firstTry) {
                equalOn = true;
            }
        }

        if (e.target.id === 'C') {
            if (C.innerHTML === 'CE') {
                text.innerHTML = "0";
                C.innerHTML = 'C';
                display.classList.remove('smallFont');
                smallFont = false;
            } else {
                end = flagNewItem = end = solve = false;
                firstTry = true;
                bufer = flagSign = result = null;
                text.innerHTML = "0";
                C.innerHTML = 'C';
                display.classList.remove('smallFont');
                smallFont = false;
            }
        }
    }

    if (text.innerHTML.length > 19 && !smallFont) {
        display.classList.toggle('smallFont');
        smallFont = true;
    }
}


