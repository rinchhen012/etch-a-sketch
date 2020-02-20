let container = document.querySelector('#container');

// creating 16x16 divs
for (let i = 0; i < 256; i++) {
    let div = document.createElement('div');
    container.appendChild(div);
    div.className = 'box';
}

let boxes = Array.from(document.querySelectorAll('.box'));
for (let box of boxes) {
    box.addEventListener('mousedown', event => {
        if (event.button === 0) {
            box.style.backgroundColor = 'red';
            event.preventDefault();
            window.addEventListener('mousemove', move);
        }
    })
}

function move(event) {
    if (event.buttons === 0)
        window.removeEventListener('mousemove', move);

}

function eraser(event) {

}