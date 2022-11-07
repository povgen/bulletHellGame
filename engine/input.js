/** Пользовательский ввод мини-либа */

var pressedKeys = {};

function setKey(event, status) {
    var code = event.keyCode;
    var key;

    switch(code) {
        case 82: key = 'R'; break;
        case 16: key = 'SHIFT'; break;
        case 17: key = 'CTRL'; break;
        case 18: key = 'ALT'; break;
        case 20: key = 'CAPS'; break;
        case 32: key = 'SPACE'; break;
        case 37: key = 'LEFT'; break;
        case 38: key = 'UP'; break;
        case 39: key = 'RIGHT'; break;
        case 40: key = 'DOWN'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
            console.log(code);
            console.log(key);
    }

    pressedKeys[key] = status;
}
document.addEventListener('keydown', e =>setKey(e, true));
document.addEventListener('keyup', e => setKey(e, false));
window.addEventListener('blur', () =>{ pressedKeys = {}; });

window.input = {  isDown: key => pressedKeys[key.toUpperCase()] };


var mouseInput = {position : {x:0, y:0}, isClicked : false};

document.addEventListener('mousedown', function(event) {
    mouseInput.isClicked = true;
});

document.addEventListener('mouseup', function(event) {
    mouseInput.isClicked = false;
});

document.addEventListener('mousemove', function(event) {
    mouseInput.position.x = event.clientX;
    mouseInput.position.y = event.clientY;
});