class Cube {
  constructor() {
    this.reset();
    this.moveHistory = [];
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b')
    };
    this.moveHistory = [];
  }

  scramble() {
    const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
    for (let i = 0; i < 20; i++) {
      const face = moves[Math.floor(Math.random() * moves.length)];
      const times = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < times; j++) {
        this.rotate(face);
        this.moveHistory.push(face);
      }
    }
  }

  rotate(face, record = true) {
    const rotateFaceClockwise = (arr) => [
      arr[6], arr[3], arr[0],
      arr[7], arr[4], arr[1],
      arr[8], arr[5], arr[2]
    ];

    this.faces[face] = rotateFaceClockwise(this.faces[face]);

    const f = this.faces;
    let temp;

    if (face === 'F') {
      temp = [f.U[6], f.U[7], f.U[8]];
      [f.U[6], f.U[7], f.U[8]] = [f.L[8], f.L[5], f.L[2]];
      [f.L[2], f.L[5], f.L[8]] = [f.D[2], f.D[1], f.D[0]];
      [f.D[0], f.D[1], f.D[2]] = [f.R[6], f.R[3], f.R[0]];
      [f.R[0], f.R[3], f.R[6]] = temp;
    }
    if (face === 'B') {
      temp = [f.U[0], f.U[1], f.U[2]];
      [f.U[0], f.U[1], f.U[2]] = [f.R[2], f.R[5], f.R[8]];
      [f.R[2], f.R[5], f.R[8]] = [f.D[8], f.D[7], f.D[6]];
      [f.D[6], f.D[7], f.D[8]] = [f.L[6], f.L[3], f.L[0]];
      [f.L[0], f.L[3], f.L[6]] = temp;
    }
    if (face === 'U') {
      temp = [f.B[0], f.B[1], f.B[2]];
      [f.B[0], f.B[1], f.B[2]] = [f.R[0], f.R[1], f.R[2]];
      [f.R[0], f.R[1], f.R[2]] = [f.F[0], f.F[1], f.F[2]];
      [f.F[0], f.F[1], f.F[2]] = [f.L[0], f.L[1], f.L[2]];
      [f.L[0], f.L[1], f.L[2]] = temp;
    }
    if (face === 'D') {
      temp = [f.B[6], f.B[7], f.B[8]];
      [f.B[6], f.B[7], f.B[8]] = [f.L[6], f.L[7], f.L[8]];
      [f.L[6], f.L[7], f.L[8]] = [f.F[6], f.F[7], f.F[8]];
      [f.F[6], f.F[7], f.F[8]] = [f.R[6], f.R[7], f.R[8]];
      [f.R[6], f.R[7], f.R[8]] = temp;
    }
    if (face === 'L') {
      temp = [f.U[0], f.U[3], f.U[6]];
      [f.U[0], f.U[3], f.U[6]] = [f.B[8], f.B[5], f.B[2]];
      [f.B[2], f.B[5], f.B[8]] = [f.D[0], f.D[3], f.D[6]];
      [f.D[0], f.D[3], f.D[6]] = [f.F[0], f.F[3], f.F[6]];
      [f.F[0], f.F[3], f.F[6]] = temp;
    }
    if (face === 'R') {
      temp = [f.U[2], f.U[5], f.U[8]];
      [f.U[2], f.U[5], f.U[8]] = [f.F[2], f.F[5], f.F[8]];
      [f.F[2], f.F[5], f.F[8]] = [f.D[2], f.D[5], f.D[8]];
      [f.D[2], f.D[5], f.D[8]] = [f.B[6], f.B[3], f.B[0]];
      [f.B[0], f.B[3], f.B[6]] = temp;
    }

    if (record) this.moveHistory.push(face);
  }

  getFaceHTML(face, label) {
    const colors = {
      w: 'bg-white',
      y: 'bg-yellow-400',
      o: 'bg-orange-500',
      r: 'bg-red-500',
      g: 'bg-green-500',
      b: 'bg-blue-500'
    };
    return `
      <div class="face-container">
        <div class="cube-face" onclick="cube.rotate('${face}'); cube.render();">
          ${this.faces[face].map(c => `<div class="tile ${colors[c]}"></div>`).join('')}
        </div>
        <div class="face-label">${label}</div>
      </div>
    `;
  }

  render() {
    document.getElementById('cubeDisplay').innerHTML =
      this.getFaceHTML('U', 'Up') +
      this.getFaceHTML('L', 'Left') +
      this.getFaceHTML('F', 'Front') +
      this.getFaceHTML('R', 'Right') +
      this.getFaceHTML('B', 'Back') +
      this.getFaceHTML('D', 'Down');
  }

  solve() {
    const reverse = [...this.moveHistory].reverse();
    reverse.forEach(move => {
      this.rotate(move, false);
      this.rotate(move, false);
      this.rotate(move, false);
    });
    this.moveHistory = [];
    this.render();
  }
}

const cube = new Cube();
cube.render();

document.getElementById('scrambleBtn').addEventListener('click', () => {
  cube.scramble();
  cube.render();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  cube.reset();
  cube.render();
});

document.getElementById('solveBtn').addEventListener('click', () => {
  cube.solve();
});




