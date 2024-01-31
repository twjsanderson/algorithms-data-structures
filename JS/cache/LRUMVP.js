// return Buffer.from(JSON.stringify(value)).length bytes

class LRUCache {
    constructor(capacity = 1) {
        this.list = [];
        this.size = 0;
        this.capacity = capacity;
    }

    set(key, value) {
        const keyInList = this.isKeyInList(key);
        if (keyInList) {
            this.delete(value);
        }
        this.insert(value);
        this.reSize();
    }

    insert(value) {
        this.list = [value, ...this.list];
        this.size++;
    }

    isKeyInList(value) {
        return this.list.find(el => this.deepEqual(el, value));
    }

    getMostRecent(value) {
        this.set(value);
        return this.list[0];
    }

    delete(value) {
        this.size--;
        this.list = this.list.filter(el => !this.deepEqual(el, value));
    }

    reSize() {
        if (this.size > this.capacity) {
            this.list.pop();
            this.size--;
        }
    }

    show() {
        return {
            'list': this.list,
            'size': this.size,
            'capacity': this.capacity
        }
    }

    deepEqual(x, y) {
        const xKeys = Object.keys(x);
        const yKeys = Object.keys(y);
        const xType = typeof x;
        const yType = typeof y;
        return (
            x && y && xType === 'object' && xType === yType
            ) ? (
                xKeys.length === yKeys.length &&
                xKeys.every(key => this.deepEqual(x[key], y[key]))
            ) : (
                x === y
            );
    }

    // reports
}

const cache = new LRUCache(3)
// cache.set('fdsaf')
// cache.set('mkomk')
// cache.set('dfs')
// cache.set('mkomk')
// cache.set('mkomk');
// cache.set({'gog':'mkomk'});
cache.set({'gog':'mkomk'});
// console.log(cache.get('dfs'))
console.log(cache.show())
// const stringified = JSON.stringify({"fsfs": "fjdsokfdsafasfasfafdsagfdsbfdhsjakbfhjdsabhjflbdsjahbfjldsabjlfkhdsabfjldsgailfbdsjlabfjkdslajfkbdshajlfbjdsaklbfjklsajbgflkjdsbaklfjbdsakjlbfn"})
// const buf = Buffer.from(stringified, 'binary');
// const len = Buffer.byteLength(buf);
// console.log(buf)
// const string = buf.toString();
// console.log(string)

function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
  }
// console.log(formatByteSize(len))
