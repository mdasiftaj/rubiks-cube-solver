class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r')
    };
  }

  render() {
    const colorString =
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('');
    getCubeSvg(colorString);
  }

  rotateFace(face, clockwise = true) {
    this.rotateFaceSquares(face, clockwise);

    if (face === 'F') {
      const temp = [...this.faces.U];
      const L = this.faces.L;
      const R = this.faces.R;
      const D = this.faces.D;

      if (clockwise) {
        [this.faces.U[6], this.faces.U[7], this.faces.U[8]] = [L[8], L[5], L[2]];
        [L[2], L[5], L[8]] = [D[0], D[1], D[2]];
        [D[0], D[1], D[2]] = [R[6], R[3], R[0]];
        [R[0], R[3], R[6]] = [temp[6], temp[7], temp[8]];
      } else {
        [this.faces.U[6], this.faces.U[7], this.faces.U[8]] = [R[0], R[3], R[6]];
        [R[0], R[3], R[6]] = [D[0], D[1], D[2]];
        [D[0], D[1], D[2]] = [L[2], L[5], L[8]];
        [L[2], L[5], L[8]] = [temp[6], temp[7], temp[8]];
      }
    }

    this.render();
  }

  rotateFaceSquares(face, clockwise = true) {
    const f = this.faces[face];
    const copy = [...f];
    if (clockwise) {
      f[0] = copy[6]; f[1] = copy[3]; f[2] = copy[0];
      f[3] = copy[7]; f[4] = copy[4]; f[5] = copy[1];
      f[6] = copy[8]; f[7] = copy[5]; f[8] = copy[2];
    } else {
      f[0] = copy[2]; f[1] = copy[5]; f[2] = copy[8];
      f[3] = copy[1]; f[4] = copy[4]; f[5] = copy[7];
      f[6] = copy[0]; f[7] = copy[3]; f[8] = copy[6];
    }
  }
}

let cube = new Cube();
let scrambleMoves = [];

function getCubeSvg(colorString) {
  document.getElementById('cube').innerText = `
U: ${cube.faces.U.join(' ')}
R: ${cube.faces.R.join(' ')}
F: ${cube.faces.F.join(' ')}
D: ${cube.faces.D.join(' ')}
L: ${cube.faces.L.join(' ')}
B: ${cube.faces.B.join(' ')}
  `;
}

function scrambleCube() {
  scrambleMoves = [];
  const moves = ['F'];
  for (let i = 0; i < 10; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const clockwise = Math.random() > 0.5;
    scrambleMoves.push({ move, clockwise });
    cube.rotateFace(move, clockwise);
  }
}

function solveCube() {
  for (let i = scrambleMoves.length - 1; i >= 0; i--) {
    const { move, clockwise } = scrambleMoves[i];
    cube.rotateFace(move, !clockwise);
  }
}

cube.render();
