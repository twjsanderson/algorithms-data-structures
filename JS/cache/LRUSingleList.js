class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next ? next : null;
    }
}

class LRUSingleList {
    constructor(capacity) {
        this.cacheList;
        this.cacheMap = {};
        this.cacheSize = 0;
        this.capacity = capacity > 0 ? capacity : 1;
    }

    // Used to re-calc the cacheMap whenever cacheList has been updated
    rebuildCacheMap() {
        let head = this.cacheList;
        this.cacheMap = {}
        let index = 0;
        while (head) {
            this.cacheMap[head.val] = index;
            head = head.next;
            index++;
        }
    }

    deleteCacheListNode(index) {
        let head = this.cacheList;
        // delete head if index === 0
        if (index === 0) {
            head = head.next;
            this.cacheList = head;
            return;
        }
        // delete tail if index === end of list
        if (index === this.cacheSize) {
            while (head) {
                if (head.next.next === null) {
                    head.next = null;
                    return;
                }
                head = head.next;
            }
        }
        // delete node somewhere inside list
        let currIndex = 0;
        while (head) {
            if (currIndex === index - 1) {
                head.next = head.next.next;
                return;
            }
            head = head.next;
            currIndex++;
        }
    };

    addNewValue(value) {
        // add value to head of cacheList
        const newHead = new ListNode(value, this.cacheList);
        this.cacheList = newHead;
        this.rebuildCacheMap();
    }

    refer(value) {
        // if cache is empty
        if (this.cacheSize === 0) {
            this.cacheList = new ListNode(value);
            this.cacheSize++;
            const listIndex = 0;
            this.cacheMap[value] = listIndex;
            return;
        }

        const listIndex = this.cacheMap[value];
        if (listIndex > -1)  { 
            // value already in list, delete it from existing position
            this.deleteCacheListNode(listIndex);
        } else if (this.cacheSize < this.capacity) { 
            // value is net new, so increase cacheSize
            this.cacheSize++;
        } else { 
            // delete last node in list
            const listLength = Object.keys(this.cacheMap).length;
            this.deleteCacheListNode(listLength - 1);
        }
        this.addNewValue(value);
        return;
    }
}

module.exports = { LRUSingleList };


