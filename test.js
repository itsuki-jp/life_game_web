//  配列のコピー
function copyMatrix(base) {
    const result = new Array(base.length);
    for (let i = 0; i < base.length; i++) {
        result[i] = base[i].slice();
    }
    return result;
}


// ---------- 変数 ----------
const dead = 0;
let alive = 1;
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
let h = null;
let w = null;
let size_w = null;
let size_h = null;


let life_game = null;
let canvas = null;
let ctx = null;
let cells = null;


// 描写ボタンが押されたら動く、色々と初期化するやつ
const init = () => {
    // ---------- サイズの取得 ----------
    h = parseInt(document.getElementById("h").value || 100);
    w = parseInt(document.getElementById("w").value || 100);
    size_w = parseInt(document.getElementById("size_w").value || 5);
    size_h = parseInt(document.getElementById("size_h").value || 5);

    // ---------- HTMLに出力するための準備 ----------
    life_game = document.getElementById("life_game");
    life_game.lastElementChild.remove();
    canvas = document.createElement("canvas");
    canvas.width = size_w * w;
    canvas.height = size_h * h;
    life_game.appendChild(canvas);
    ctx = canvas.getContext("2d");

    // ---------- 色を指定 ----------
    ctx.strokeStyle = "black"; // 線の色
    ctx.fillStyle = "red"; // 塗りつぶしの色

    // ---------- 初期化 ----------
    cells = Array(h).fill().map(() => Array(w).fill(dead));
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            let dead_or_alive = Math.floor(Math.random() * 2);
            if (dead_or_alive) {
                ctx.fillRect(j * size_w, i * size_h, size_w, size_h);
                cells[i][j] = alive;
            }
        }
    }
    setInterval(main, 1000);
}

const main = () => {
    console.log("main");
    let new_cells = copyMatrix(cells);
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