function createGrid(height, width) {
    const canvas = document.querySelector(".canvas");
    canvas.innerHTML = ""; //clear previous div
    for (let i = 0; i < height; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < width; j++) {
            const col = document.createElement("div");
            col.classList.add("col");
            col.classList.add("cell");
            row.appendChild(col);
        }

        canvas.appendChild(row);
    }
    startDrawing();
};

// initiate a grid
createGrid(20, 20);

// change grid
const gridButton = document.querySelector(".grid-btn");
gridButton.addEventListener('click', e => {

    let height = parseInt(prompt("Enter grid height (Max 100)", "20")) || 0;
    let width = parseInt(prompt("Enter grid width (Max 100)", "20")) || 0;
    if (height > 100) height = 100;
    if (width > 100) width = 100;
    if (height < 0) height = 0;
    if (width < 0) width = 0;

    createGrid(height, width);
});

// change cell size
const sizeButton = document.querySelector(".size-btn");
sizeButton.addEventListener('click', e => {
    let newSize = parseInt(prompt("Enter size in px (Max 100, Min 1)", "20")) || 20;
    if (newSize > 100) newSize = 100;
    if (newSize < 1) newSize = 1;
    const root = document.documentElement;
    root.style.setProperty('--grid-size', `${newSize}px`);

});

// Main logic
function startDrawing() {
    const cells = document.querySelectorAll(".cell");

    document.addEventListener('mousedown', e => {
        cells.forEach(cell => {
            cell.addEventListener('mouseover', colorCell);
        });
        e.preventDefault();
    });
    document.addEventListener('mouseup', e => {
        cells.forEach(cell => {
            cell.removeEventListener('mouseover', colorCell);
        });
        e.preventDefault();
    });

    function colorCell(e) {
        let currentOpacity = parseFloat(e.target.style.opacity) || 0;
        let newOpacity = Math.min(currentOpacity + 0.1, 1);
        e.target.style.opacity = newOpacity.toString();
    };
}