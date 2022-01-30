//  配列のコピー
function copyMatrix(base) {
    const result = new Array(base.length);
    for (let i = 0; i < base.length; i++) {
        result[i] = base[i].slice();
    }
    return result;
}


// ---------- 変数 ----------
const h = 140;
const w = 25;
const size_w = 5;
const size_h = 5;
const dead = 0;
const alive = 1;
const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, -1],
    [1, 1],
    [-1, 0],
    [-1, -1],
    [-1, 1]
];

// ---------- HTMLに出力するための準備 ----------
const life_game = document.getElementById("life_game");
const canvas = document.createElement("canvas");
canvas.width = size_w * w;
canvas.height = size_h * h;
life_game.appendChild(canvas)
const ctx = canvas.getContext("2d");



// ---------- 色を指定 ----------
ctx.strokeStyle = "black"; // 線の色
ctx.fillStyle = "red"; // 塗りつぶしの色



// ---------- 初期化 ----------
let cells = Array(h).fill().map(() => Array(w).fill(dead));
for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let dead_or_alive = Math.floor(Math.random() * 2);
        if (dead_or_alive) {
            ctx.fillRect(j * size_w, i * size_h, size_w, size_h);
            cells[i][j] = alive;
        }
    }
}
console.log(cells);

const main = () => {
    console.log("start");
    let new_cells = copyMatrix(cells);
    console.log(cells);
    for (let i = 0; i < h; i++) {
        let temp_i = i * size_h;
        for (let j = 0; j < w; j++) {
            let temp_j = j * size_w;
            let temp = 0
            for (let txty = 0; txty < 8; txty++) {
                let nx = direction[txty][0] + j;
                let ny = direction[txty][1] + i;
                if (((0 <= nx) && (nx < w)) && ((0 <= ny) && (ny < h))) {
                    if ((cells[ny][nx] == alive)) {
                        temp += 1;
                    }
                }
            }
            if (cells[i][j] === dead) {
                if (temp === 3) {
                    new_cells[i][j] = alive;
                    ctx.fillRect(temp_j, temp_i, size_w, size_h);
                }
            } else {
                if (([2, 3].indexOf(temp) === -1)) {
                    new_cells[i][j] = dead;
                    ctx.clearRect(temp_j, temp_i, size_w, size_h);
                }
            }
        }
    }
    cells = copyMatrix(new_cells);
}

setInterval(main, 1000);