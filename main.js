import { Cube } from './cube.js';

const cube = new Cube();
let scrambleSteps = [];

const cubeContainer = document.getElementById('cube-container');

function drawCube() {
  cubeContainer.innerHTML = '';
  const faceOrder = ['U', 'D', 'F', 'B', 'L', 'R'];

  faceOrder.forEach(face => {
    cube.faces[face].forEach(color => {
      const tile = document.createElement('div');
      tile.classList.add('tile', color);
      cubeContainer.appendChild(tile);
    });
  });
}

drawCube();

document.getElementById('scrambleBtn').onclick = () => {
  scrambleSteps = cube.scramble();
  drawCube();
};

document.getElementById('solveBtn').onclick = () => {
  cube.solve(scrambleSteps);
  drawCube();
};

document.getElementById('resetBtn').onclick = () => {
  cube.reset();
  drawCube();
};
