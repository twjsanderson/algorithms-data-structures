/**
 * Implement a BFS that collects all values and 
 * returns them in an array
 * ex. [2,3,4,5]
 */
const BFS = (root) => {
    let queue = [root];
    let result = [];
    while (queue.length) {
        const curr = queue.shift();
        result.push(curr.val)

        if (curr.left) {
            queue.push(curr.left)    
        }
        if (curr.right) {
            queue.push(curr.right)    
        }
    }
    return result;
};

/**
 * Tests
 */

const trees = [
    { 
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: null
        }
    },
    {},
    { 
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    },
];

const BFSAnswers = [
    [1, 2, 3, 4, 5],
    [],
    [1, 2, 3]
];

const BFSTests = () => {
    let results = [];
    for (let i = 0; i < trees.length; i++) {
        const userAnswers = BFS(trees[i]);
        let passed = true;
        for (let j = 0; j < BFSAnswers[i].length; j++) {
            if (BFSAnswers[i][j] !== userAnswers[j]) {
                passed = false;
            }
        }
        if (passed) {
            results.push(`PASSED: Test Answer: ${BFSAnswers[i]} === User Answers: ${userAnswers}`)
        } else {
            results.push(`FAILED: Test Answer: ${BFSAnswers[i]} !== User Answers: ${userAnswers}`);
        }
    }
    return results;
};

console.log(BFSTests());


/**
 * Implement DFS PreOrder
 */
const DFS = (root) => {
    let stack = [root];
    let result = [];
    
    while (stack.length) {
        let curr = stack.pop();
        result.push(curr.val);
        if (curr.right) {
            stack.push(curr.right);
        }
        if (curr.left) {
            stack.push(curr.left);
        }
    }
    return result;
    
}

// Pre-Order
const DFSAnswers = [
    [1,2,4,3,5],
    [],
    [1,2,3]
];

// Pre-Order
const DFSTests = () => {
    let results = [];
    for (let i = 0; i < trees.length; i++) {
        const userAnswers = DFS(trees[i]);
        let passed = true;
        for (let j = 0; j < DFSAnswers[i].length; j++) {
            if (!userAnswers || DFSAnswers[i][j] !== userAnswers[j]) {
                passed = false;
            }
        }
        if (passed) {
            results.push(`PASSED: Test Answer: ${DFSAnswers[i]} === User Answers: ${userAnswers}`)
        } else {
            results.push(`FAILED: Test Answer: ${DFSAnswers[i]} !== User Answers: ${userAnswers}`);
        }
    }
    return results;
};

console.log(DFSTests());

