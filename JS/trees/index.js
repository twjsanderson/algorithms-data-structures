/**
 * Implement a BFS that collects all values and 
 * returns them in an array
 * ex. [2,3,4,5]
 */
const BFS = (root) => {
    let queue = [root];
    let result = [];
    while (queue.length) {
        const curr_node = queue.shift();
        result.push(curr_node.val)

        if (curr_node.left) {
            queue.push(curr_node.left)    
        }
        if (curr_node.right) {
            queue.push(curr_node.right)    
        }
    }
    return result;
};











/**
 * Tests
 */

const BFSInputs = [
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
    for (let i = 0; i < BFSInputs.length; i++) {
        const userAnswers = BFS(BFSInputs[i]);
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