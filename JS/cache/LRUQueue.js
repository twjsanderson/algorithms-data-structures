class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next ? next : null;
    }
}

class LRUCache {
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
        // if value already in list, delete it from existing position
        if (listIndex > -1)  {
            this.deleteCacheListNode(listIndex);
        } else {
            // value is net net, so increase cacheSize
            this.cacheSize++;
        }

        // add value to head of cacheList
        const newHead = new ListNode(value, this.cacheList);
        this.cacheList = newHead;
        this.rebuildCacheMap();

        // if cache size exceeds capacity, delete extra tails nodes
        if (this.cacheSize > this.capacity) {
            let index = 0;
            let head = this.cacheList;
            while (head) {
                if (index === this.capacity - 1) {
                    head.next = null;
                    this.rebuildCacheMap();
                    // cacheSize should now equal capacity
                    this.cacheSize = this.capacity;
                    return;
                }
                head = head.next;
                index++;
            }
        }
        return;
    }
}

// TEST FUNCTIONS
const testCacheSizeToCapacity = (cache) => {
    const actualCacheSize = cache.cacheSize;
    const capacity = cache.capacity;
    const equal = actualCacheSize <= capacity;
    return console.log(equal ?
        `PASS: actual cache size: ${actualCacheSize} is equal to or less than capacity: ${capacity}`:
        `FAIL: actual cache size: ${actualCacheSize} is greater than capacity: ${capacity}`
    );
};

const testCacheMap = (cache, expectedMap) => {
    const cacheMap = cache.cacheMap;
    for (const key in cacheMap) {
        if (cacheMap[key] !== expectedMap[key]) {
            return console.log(`FAIL: actual is not equal to expected cacheMap \n ${key}: ${cacheMap[key]} !== ${key}: ${expectedMap[key]}`);
        }
    }
    return console.log(`PASS: actual is equal to expected cacheMap`);
};

const testCacheList = (cache, expectedListValues) => {
    let linkedList = cache.cacheList;
    let index = 0;
    while (linkedList) {
        if (expectedListValues[index] !== linkedList.val) {
            return console.log(`FAIL: actual cacheList is not equal to expected cacheList \n ${index}: ${linkedList.val} !== ${index}: ${expectedListValues[index]}`);
        }
        linkedList = linkedList.next;
        index++;
    }
    return console.log(`PASS: actual is equal to expected cacheList`);
}

// TEST CASES
const cache = new LRUCache(3);
const testCases = [
    {input: 1, expectedList: [1], expectedMap: {'1': 0}},
    {input: 2, expectedList: [2, 1], expectedMap: {'2': 0, '1': 1}},
    {input: 3, expectedList: [3, 2, 1], expectedMap: {'3': 0, '2': 1, '1': 2}},
    {input: 4, expectedList: [4, 3, 2], expectedMap: {'4': 0, '3': 1, '2': 2}},
    {input: 1, expectedList: [1, 4, 3], expectedMap: {'1': 0, '4': 1, '3': 2}},
    {input: 2, expectedList: [2, 1, 4], expectedMap: {'2': 0, '1': 1, '4': 2}},
    {input: 5, expectedList: [5, 2, 1], expectedMap: {'5': 0, '2': 1, '1': 2}},
    {input: 1, expectedList: [1, 5, 2], expectedMap: {'1': 0, '5': 1, '2': 2}},
    {input: 2, expectedList: [2, 1, 5], expectedMap: {'2': 0, '1': 1, '5': 2}},
    {input: 3, expectedList: [3, 2, 1], expectedMap: {'3': 0, '2': 1, '1': 2}}
];

// RUN TESTS
for (const testCase of testCases) {
    const { input, expectedList, expectedMap } = testCase;
    cache.refer(input);
    testCacheList(cache, expectedList);
    testCacheMap(cache, expectedMap)
    testCacheSizeToCapacity(cache);
};
