const { LRUSingleList } = require('./LRUSingleList.js');

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
const cache = new LRUSingleList(3);
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