export default class TestImpl {
    constructor() {
        this.lines = [""];
        this.y = 0;
        this.x = 0;
        this.resizeListeners = [];
        this._columns = 100;
        this._rows = 100;
    }
    get columns() {
        return this._columns;
    }
    set columns(col) {
        this._columns = col;
        this.callResizeListener();
    }
    get rows() {
        return this._rows;
    }
    set rows(row) {
        this._rows = row;
        this.callResizeListener();
    }
    callResizeListener() {
        this.resizeListeners.forEach((value) => value());
    }
    on(_event, listener) {
        this.resizeListeners.push(listener);
        return this;
    }
    getColorDepth() {
        return 24;
    }
    write(buffer, cb) {
        for (let c of buffer) {
            if (c === "\n") {
                this.y++;
                this.x = 0;
                this.lines.push("");
            }
            else {
                this.x++;
                this.lines[this.y] += c;
            }
        }
        return true;
    }
    clearLine(dir) {
        this.lines[this.y] = "";
        this.x = 0;
        return true;
    }
    moveCursor(dx, dy) {
        this.x += dx;
        this.y += dy;
        return true;
    }
    cursorTo(x, y) {
        this.x = x;
        if (y !== undefined)
            this.y = y;
        return true;
    }
}