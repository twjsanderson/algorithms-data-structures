class DoublyLinkedNode {
    constructor(val, key) {
        this.val = val;
        this.key = key !== undefined ? key : undefined;
        this.next = undefined;
        this.prev = undefined;
    }
}

class DoublyLinkedList {
    constructor() {
      this.head = undefined;
      this.tail = undefined;
      this.size = 0;
    }

    append(node) {
        /**
         * append list 
         * 1. when list is empty
         * 2. when list size >= 1
         */
        if (this.size === 0) {
            this.head = node;
            this.tail = node;
            this.size++;
        } else {
            this.head.prev = node;
            node.next = this.head;
            node.prev = undefined;
            this.head = node;
            this.size++;
        }
    }

    pop() {
        /**
         * 1. create pointer
         * 2. if no tail exit early
         * 3. if 1 node in list, set both to undefined
         * 4. if > 1 node in list, set the prev.next of tail to point to undefined
         * 5. reassign tail to node, which has tail updates
         * 6. reduce list size
         * 7. return node
         */
        const node = this.tail;
        if (!node) return undefined;

        if (this.head === this.tail) {
            this.head = undefined;
            this.tail = undefined;
        } else {
            this.tail.prev.next = undefined;
        }
        this.tail = node.prev;
        this.size--;
        return node;
    }

    moveToHead(node) {
        if (
            node === this.head ||
            (
                node === this.head &&
                node === this.tail
            )
        ) return;
                
        if (node === this.tail) {
            this.tail = this.tail.prev;
            this.tail.next = undefined;
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            node.prev = undefined;
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            node.prev = undefined;
        }
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = {};
        this.list = new DoublyLinkedList();
    }

    get(key) {
        const existingNode = this.map[key];
        if (existingNode) {
            this.list.moveToHead(existingNode);
        }
        return existingNode;
    }

    set(key, value) {
        const existingNode = this.get(key);
        if (existingNode) {
            existingNode.value = value;
            return existingNode;
        }

        const newNode = new DoublyLinkedNode(value, key);
        this.map[key] = newNode;
        this.list.append(newNode);

        if (this.atCapacity()) {
            this.evictLeastRecentlyUsed();
        }
    }

    atCapacity() {
        return this.list.size === this.capacity + 1;
    }

    evictLeastRecentlyUsed() {
        const evictedNode = this.list.pop();
        delete this.map[evictedNode.key];
    }
}

// const list = new DoublyLinkedList(3);
// list.append(new DoublyLinkedNode(1))
// list.append(new DoublyLinkedNode(2))
// list.append(new DoublyLinkedNode(3))
// list.pop()
// console.log(list)

const list = new LRUCache(3);
list.set('one', 'one value')
list.set('two', 'two value')
list.set('three', 'three value')
list.set('four', 'four value')
console.log(list.list, list.map)