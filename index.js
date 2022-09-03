"use strict";
class CellularAutomata {
    constructor(size, ctx, cells = []) {
        this.size = size;
        this.unit = size / 100;
        this.ctx = ctx;
        this.cells = cells;
    }
    create() {
        for (let x = 0; x < this.size; x++) {
            let row = [];
            for (let y = 0; y < this.size; y++) {
                const alive = Math.random() < 0.5;
                row.push(alive);
            }
            this.cells.push(row);
        }
    }
    next() {
        this.print();
        this.evaluate();
    }
    print() {
        this.ctx.clearRect(0, 0, this.size, this.size);
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.cells[x][y]) {
                    this.ctx.fillStyle = "black";
                }
                else {
                    this.ctx.fillStyle = "white";
                }
                this.ctx.fillRect(x, y, this.unit, this.unit);
            }
        }
    }
    evaluate() {
        let cellsAux = new Array(100)
            .fill("")
            .map(() => new Array(100).fill(false));
        console.log({ cellsAux });
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let livingNeighbor = 0;
                if (x > 0 && y > 0) {
                    if (this.cells[x - 1][y - 1]) {
                        livingNeighbor++;
                    }
                }
                if (y > 0) {
                    if (this.cells[x][y - 1]) {
                        livingNeighbor++;
                    }
                }
                if (x < this.size - 1 && y > 0) {
                    if (this.cells[x + 1][y - 1]) {
                        livingNeighbor++;
                    }
                }
                if (x > 0) {
                    if (this.cells[x - 1][y]) {
                        livingNeighbor++;
                    }
                }
                if (x < this.size - 1) {
                    if (this.cells[x + 1][y]) {
                        livingNeighbor++;
                    }
                }
                if (x > 0 && y < this.size - 1) {
                    if (this.cells[x - 1][y + 1]) {
                        livingNeighbor++;
                    }
                }
                if (y < this.size - 1) {
                    if (this.cells[x][y + 1]) {
                        livingNeighbor++;
                    }
                }
                if (x < this.size - 1 && y < this.size - 1) {
                    if (this.cells[x + 1][y + 1]) {
                        livingNeighbor++;
                    }
                }
                if (this.cells[x][y]) {
                    cellsAux[x][y] =
                        livingNeighbor == 2 || livingNeighbor == 3 ? true : false;
                }
                else {
                    cellsAux[x][y] = livingNeighbor == 3 ? true : false;
                }
            }
        }
        this.cells = cellsAux;
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const cellularAutomata = new CellularAutomata(100, ctx);
            cellularAutomata.create();
            setInterval(() => {
                cellularAutomata.next();
            }, 500);
        }
    }
});
//# sourceMappingURL=index.js.map