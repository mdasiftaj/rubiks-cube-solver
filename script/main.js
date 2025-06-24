import { Cube } from './cube.js';

const cube = new Cube();
let scrambleSteps = [];

// DOM
const cubeGrid = document.getElementById('cube');

// Face colors
const faceColorMap = {
  U: 'white',
  D: 'yellow',
  F: 'green',
  B: 'blue',
  L: 'orange',
  R: 'red'
};

// Position map for 2D rendering (each face is a 3x3)
const faceOffset = {
  U: [0, 3],
  L: [3, 0],
  F: [3, 3],
  R: [3, 6],
  B: [3, 9],
  D: [6, 3]
};

// Render cube
function renderCube() {
  cubeGrid.innerHTML = '';

  for (const face in cube.faces) {
    const [rowOffset, colOffset] = faceOffset[face];
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = faceColorMap[cube.faces[face][i]];
      tile.style.gridRowStart = rowOffset + Math.floor(i / 3) + 1;
      tile.style.gridColumnStart = colOffset + (i % 3) + 1;
      cubeGrid.appendChild(tile);
    }
  }
}

// Scramble
window.scrambleCube = function () {
  scrambleSteps = cube.scramble(20); // 20 random moves
  renderCube();
};

// Solve
window.solveCube = function () {
  cube.solve(scrambleSteps);
  renderCube();
};

// Reset
window.resetCube = function () {
  cube.reset();
  scrambleSteps = [];
  renderCube();
};

renderCube();
