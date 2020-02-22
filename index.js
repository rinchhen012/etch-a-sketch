let choice = 16;
const container = document.querySelector('#container');
const defaultColor = '#ffffff';

gridCreate(choice ** 2);
custom();

const gridSwitch = document.querySelector('.remove-grid');
gridSwitch.addEventListener('click', gridSwitcher);

// reset entire container
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    boxes.forEach(box => {
        box.style.backgroundColor = defaultColor;
    })
});

listeners();
// mousedown event listener to call move() & eraser  
function listeners() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    boxes.forEach(box => {
        box.addEventListener('mousedown', event => {
            if (event.button === 0) {
                box.style.backgroundColor = '#FFD662';
                event.preventDefault();
                container.addEventListener('mousemove', move);
                container.addEventListener('mousemove', event => {
                    if (event.button === 0 && event.ctrlKey)
                        event.target.style.backgroundColor = defaultColor;
                })
            }
        })
    })
}
// changes to custom grid layout using user input
function custom() {
    const custom = document.querySelector('.custom');
    custom.addEventListener('click', () => {
        container.innerHTML = "";
        choice = prompt('Enter layout');
        if (choice <= 0 || choice > 64)
            alert('invalid! enter again');
        else {
            let colsRows = choice;
            choice *= choice;
            gridCreate(choice);
            listeners();
            choice = choice / colsRows;
            container.style.gridTemplateColumns = `repeat(${choice}, auto)`;
            container.style.gridTemplateRows = `repeat(${choice}, auto)`;
        }
    });
}
// get random rgb values
function randomRgb() {
    return Math.floor(Math.random() * 256);
}
// get black values
function addBlack(rgb) {
    let r = Math.round(rgb[0] * 0.7);
    let g = Math.round(rgb[1] * 0.7);
    let b = Math.round(rgb[2] * 0.7);
    return [r, g, b];
}
// switches gridline 1/0
function gridSwitcher() {
    const boxes = Array.from(document.querySelectorAll('.box'));
    if (event.target.textContent == 'Remove Gridlines') {
        event.target.textContent = 'Show Gridlines';
        for (box of boxes)
            box.style.border = 'none';
    }
    else {
        event.target.textContent = 'Remove Gridlines';
        for (let box of boxes)
            box.style.border = '1px solid rgb(71, 71, 71)';
    }
}
// creates divs
function gridCreate(x) {
    for (let i = 0; i < x; i++) {
        let div = document.createElement('div');
        container.appendChild(div);
        div.className = 'box';
    }
}
// colors the box when mouse is moved
function move() {
    // Removes colorize on hover effect.
    if (event.buttons === 0)
        container.removeEventListener('mousemove', move);

    let boxColor = event.target.style.backgroundColor;
    let boxOpacity = event.target.style.opacity;

    if (boxColor == "")
        event.target.style.backgroundColor = `rgb(${randomRgb()},${randomRgb()},${randomRgb()})`;

    if (boxOpacity > 0)
        event.target.style.opacity = boxOpacity - 0.1;
}
