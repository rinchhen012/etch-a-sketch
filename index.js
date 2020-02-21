const container = document.querySelector('#container');
const defaultColor = '#a52a23';
let choice = 256;

gridCreate();

const gridSwitch = document.querySelector('.remove-grid');
gridSwitch.addEventListener('mousedown', gridSwitcher);

// changes to default grid layout
const defaultGrid = document.querySelector('.default');
defaultGrid.addEventListener('mousedown', () => {
    choice = 256;
    gridCreate();
    container.style.gridTemplateColumns = `repeat(16, auto)`;
    container.style.gridTemplateRows = `repeat(16, auto)`;
});

// changes to custom grid layout
const custom = document.querySelector('.custom');
custom.addEventListener('mousedown', () => {
    choice = prompt('Enter layout');
    if (!choice) choice = 16;
    let colsRows = choice;
    choice *= choice;
    gridCreate();
    choice = choice / colsRows;
    container.style.gridTemplateColumns = `repeat(${choice}, auto)`;
    container.style.gridTemplateRows = `repeat(${choice}, auto)`;
})

const boxes = Array.from(document.querySelectorAll('.box'));

for (let box of boxes) {
    // reset entire container
    const reset = document.querySelector('.reset');
    reset.addEventListener('mousedown', () => {
        box.style.backgroundColor = defaultColor;
    });
    // calls move func when mousedown and mousemove
    box.addEventListener('mousedown', event => {
        if (event.button === 0) {
            box.style.backgroundColor = '#FFD662';
            event.preventDefault();
            container.addEventListener('mousemove', move);
            container.addEventListener('mousemove', eraser);
        }
    });
}

// switches gridline 1/0
function gridSwitcher() {
    if (event.target.textContent == 'Remove Gridlines') {
        event.target.textContent = 'Show Gridlines';
        for (box of boxes)
            box.style.border = 'none';
    }
    else {
        event.target.textContent = 'Remove Gridlines';
        for (box of boxes)
            box.style.border = '1px solid rgb(85, 21, 21)';
    }
}

// creates divs
function gridCreate() {
    container.innerHTML = '';
    for (let i = 0; i < choice; i++) {
        let div = document.createElement('div');
        container.appendChild(div);
        div.className = 'box';
    }
}

function move(event) {
    if (event.button === 0 && event.ctrlKey)
        eraser();

    // Removes colorize on hover effect.
    if (event.buttons === 0)
        container.removeEventListener('mousemove', move);

    event.target.style.backgroundColor = '#FFD662';
}

function eraser(event) {
    if (event.button === 0 && event.ctrlKey)
        event.target.style.backgroundColor = defaultColor;
}
