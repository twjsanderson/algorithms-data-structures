/**
 * Create a Singly Linked List Node
 */

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next || null;
    }
}

/**
 * Linear Search of a Linked List
 */
const linearSearch = (list, value) => {
    let head = list;
    while (head) {
        if (head.val === value) {
            return value;
        }
        head = head.next;
    }
    return -1;
};

// Linear Search Tests
const linearSearchTestCases = [
    {
        list: new ListNode(),
        actual: 1,
        expected: -1
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3))),
        actual: 1,
        expected: 1
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3))),
        actual: 3,
        expected: 3
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3))),
        actual: 5,
        expected: -1
    }
];

const runLinearSearchTestCases = (testCases) => {
    for (const testCase of testCases) {
        const { list, actual, expected } = testCase;
        const result = linearSearch(list, actual);
        if (result === expected) {
            console.log(`PASS: actual ${actual} in list, returned ${expected}`);
        } else {
            console.log(`FAIL: actual ${actual} not found in list, returned ${expected}`);
        }
    }
    return console.log('linearSearchTestCases END \n')
};

console.log('linearSearchTestCases START')
runLinearSearchTestCases(linearSearchTestCases);

/**
 * Remove nth Node (based on index) from LinkedList
 */
const removeNodeByIndex = (list, index) => {
    let head = list;
    if (!head) return head;

    // if index is 0
    if (index === 0) {
        head = head.next;
        return head;
    }

    let i = 0;
    let prev = null;
    while (head) {
        if (i === index) {
            prev.next = prev.next.next;
            return list;
        }
        prev = head;
        head = head.next;
        i++;
    }

    // return -1 if index out of range
    return -1;
};


// Linear Search Tests
const removeNodeByIndexTestCases = [
    {
        list: new ListNode(),
        index: 1,
        expected: -1
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3))),
        index: 1,
        expected: new ListNode(1, new ListNode(3))
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))),
        index: 1,
        expected: new ListNode(1, new ListNode(3, new ListNode(4)))
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))),
        index: 0,
        expected: new ListNode(2, new ListNode(3, new ListNode(4)))
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))),
        index: 3,
        expected: new ListNode(1, new ListNode(2, new ListNode(3)))
    },
];

const runRemoveNodeByIndexTestCases = (testCases) => {
    for (const testCase of testCases) {
        const { list, index, expected } = testCase;
        const result = removeNodeByIndex(list, index);
        if (typeof result === 'number' && result === expected) {
            console.log(`PASS: result ${result} is equal to expected ${expected}`)
        } else {
            let i = 0;
            let head = result;
            let expectedHead = expected;
            let msg = `PASS: result list is equal to expected list`;
            while (head) {
                if (head.val !== expectedHead.val) {
                    msg = `FAIL: result list is not equal to expected list at index ${i}`
                }
                head = head.next;
                expectedHead = expectedHead.next;
                i++;
            }
            console.log(msg);
        }
    }
    return console.log('removeNodeByIndex END \n');
};

console.log('removeNodeByIndexTestCases START')
runRemoveNodeByIndexTestCases(removeNodeByIndexTestCases);

/**
 * Reverse a linked list
 */

const reverseList = (list) => {
    let prev = null;
    let curr = list;
    let next = null;

    while (curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    };

    return prev;
};

// Reverse List Tests
const reverseListTestCases = [
    {
        list: new ListNode(1),
        expected: new ListNode(1)
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3))),
        expected: new ListNode(3, new ListNode(2, new ListNode(1)))
    },
    {
        list: new ListNode(2, new ListNode(1)),
        expected: new ListNode(1, new ListNode(2))
    },
    {
        list: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4)))),
        expected: new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1))))
    }
];

const runReverseListTestCases = (testCases) => {
    for (const testCase of testCases) {
        const { list, expected } = testCase;
        let head = reverseList(list);
        let expectedList = expected;
        let msg = `PASS: result list is equal to expected list`;
        while (head) {
            if (head == null || expectedList === null || head.val !== expectedList.val) {
                msg = `FAIL: result list val ${head ? head.val : null} is not equal to expected val ${expectedList ? expectedList.val : null}`;
                break;
            }
            head = head.next;
            expectedList = expectedList.next;
        }
        console.log(msg)
    }
    return console.log('reverseListTestCases END \n');
};

console.log('reverseListTestCases START')
runReverseListTestCases(reverseListTestCases);

/**
 * 876. Middle of the Linked List
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node. 
 * 
 * Input: head = [1,2,3,4,5]
 * Output: [3,4,5] <-- this represents a linked list not an array
 * Explanation: The middle node of the list is node 3.
 * 
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6]
 * Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 * 
 */
const middleNode = (head) => {
    let map = {};
    let index = 0;
    let list = head;
    while (list) {
        map[index] = list;
        list = list.next;
        index++; 
    }
    const length = Object.keys(map).length;
    const mid = Math.floor(length / 2);
    return map[mid];
};

const testMiddleNode = () => {
    const tests = [
        {
            input: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))),
            expected: new ListNode(3, new ListNode(4, new ListNode(5)))
        },
        {
            input: new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))))),
            expected: new ListNode(4, new ListNode(5, new ListNode(6)))
        }
    ];
    for (testCase of tests) {
        let { input, expected }= testCase;
        const result = middleNode(input);
        let list = result;
        while (list) {
            if (list.val !== expected.val) {
                console.log(`FAIL: list ${list.val} did not equal expected ${expected.val}`)
            }
            list = list.next;
            expected = expected.next;
        }
        console.log(`PASS: result list is equal to expected list`)
    }
    return console.log('testMiddleNode END')
}

console.log('testMiddleNode START')
testMiddleNode();


