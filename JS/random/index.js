// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left-justified, and no extra space is inserted between words.

// Note:

// A word is defined as a character sequence consisting of non-space characters only.
// Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
// The input array words contains at least one word.

// Example 1:

// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
// Example 2:

// Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be 
// left-justified instead of fully-justified.
// Note that the second line is also left-justified because it contains only one word.

// Constraints:

// 1 <= words.length <= 300
// 1 <= words[i].length <= 20
// words[i] consists of only English letters and symbols.
// 1 <= maxWidth <= 100
// words[i].length <= maxWidth


var fullJustify = function(words, maxWidth) {
    let res = [];
    let cur = [];
    let num_of_letters = 0;

    for (let word of words) {
        if (word.length + cur.length + num_of_letters > maxWidth) {
            for (let i = 0; i < maxWidth - num_of_letters; i++) {
                cur[i % (cur.length - 1 || 1)] += ' ';
            }
            res.push(cur.join(''));
            cur = [];
            num_of_letters = 0;
        }
        cur.push(word);
        num_of_letters += word.length;
    }

    let lastLine = cur.join(' ');
    while (lastLine.length < maxWidth) lastLine += ' ';
    res.push(lastLine);

    return res;
}

/**
 * 1. Test if a string containing parentheses and other characters is balanced with its parentheses
2. Return the "depth" of a balanced parentheses string, meaning the maximum number of nested parentheses
3. Return the "breadth" of a balanced parentheses string, meaning return the max number of parentheses together 
along the same depth. This part is confusing and took about 20 minutes to explain in their roundabout way, 
but basically with the following input, "( () () () ) ()", your function should return 3 due to the number of 
closed parentheses at a depth level of 1.
 */

/**
 * 
 * Given a multi-dimensional array of numbers from 1-9, write a function that returns a multi-dimensional 
 * array where any consecutive numbers of at least length 3, get replaced with 0s. Numbers may be consecutive 
 * both horizontally or vertically.
 */

/**
 * HackerRank problem about solving a 2d board, replacing repeated numbers with 0.
 */

/**
 * Flatten N-Dimensional Array to 1D Array
 */
function flatten1(arr) {
    let flat = [];

    const handleFlatten = (array) => {
        for (let el of array) {
            if (!Array.isArray(el)) {
                flat.push(el)
            } else {
                handleFlatten(el);
            }   
        }
    };

    handleFlatten(arr)
    return flat;
}

// console.log(flatten1([1, [2, 3], [[4]]]), [1,2,3,4])

function flatten2(arr) {
    let stack = [...arr];
    let flat = [];
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next)
        } else {
            flat.push(next);
        }
    }
    return flat.reverse();
}

// console.log(flatten2([1, [2, 3], [[4]]]), [1,2,3,4])

/**
 * Find the Maximum Number in a List
 */

/**
 * Implement 3 Fibonacci Sequences in 3 Methods
 */

/**
 * Balanced Brackets
 * Hacker Rank
 */
function isBalancedHacker(s) {
    let stack = [];
    const pairs = {
        '{': '}',
        '[': ']',
        '(': ')'
    };
    const closedSide = Object.values(pairs);
    
    // handle empty string
    if (s === '') return 'NO';
    
    for (let index = 0; index < s.length; index++) {
        const char = s[index];
        if (pairs[char]) {
            stack.push(char);
        } else if (closedSide.includes(char) && pairs[stack.pop()] !== char) {
            return 'NO';
        }
    }
    return stack.length === 0 ? 'YES' : 'NO';
} 

/**
 * Are parentheses balanced?
 */
function isBalanced(str) {
    let count = 0;
    for (const char of str) {
        if (char === '(') {
            count++;
        } else {
            count--;
        }
        if (count < 0) {
            return false;
        }
    }
    return count !== 0 ? false : true;
}

// console.log(isBalanced("((()))()()") === true);
// console.log(isBalanced("())((())") === false);
// console.log(isBalanced("( () () () ) ()") === false);

/**
 * Find maximum depth of nested parenthesis in a string
 */
function maxDepth(str) {
    let stack = [];
    let depth = 0;
    let maxDepth = 0;
    
    for (let char of str) {
        if (char === '(') {
            depth++;
            stack.push(char);
            maxDepth = Math.max(maxDepth, depth)
        } else if (char === ')') {
            let open = stack.pop();
            if (open === '(' && depth > 0) {
                depth--;
            } else {
                return -1;
            }
        }
    }
    return stack.length === 0 ? maxDepth : -1;
};

// console.log(maxDepth("(()()((()))(()))") === 4);
// console.log(maxDepth("((())(()))") === 3);
// console.log(maxDepth("") === 0);
// console.log(maxDepth(")()()") === -1);

/**
 * Max Width/Breadth of Brackets (need depth for breadth)
 */
function maxBreadth(str) {
    let stack = [];
    let depth = 0;
    let maxDepth = 0;
    let breadths = {};
    
    for (let char of str) {
        if (char === '(') {
            depth++;
            stack.push(char);
            maxDepth = Math.max(maxDepth, depth)
            if (breadths[depth]) {
                breadths[depth]++;
            } else {
                breadths[depth] = 1;
            }
        } else if (char === ')') {
            let open = stack.pop();
            if (depth > 0 && open === '(') {
                depth--;
            } else {
                return -1;
            }
        }
    }

    // return -1 if parentheses are unbalanced
    if (stack.length !== 0) return -1;

    return {
        'isValid': true,
        'maxDepth': maxDepth,
        'maxBreadth': Math.max(...Object.values(breadths))
    } 
};
// const one = maxBreadth("( () () () ) () () () ()");
// console.log(one.maxBreadth === 5, one.maxDepth === 2)
// console.log(maxBreadth("( () () () ) ()"));
// console.log(maxBreadth("(()()((()))(()))"))

/**
 * maxbalancedprefix
 * 
 * Return the length of longest
 * balanced parentheses
 * prefix.
 */
function maxBalancedPrefix(str) {
    let sum = 0;
    let maxi = 0;
 
    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] == '(') {
            sum += 1;
        } else {
            sum -= 1;
        }

        if (sum < 0) {
            break;
        }
 
        if (sum === 0) {
            maxi = i + 1;
        }
    }
    return maxi;
}

// console.log(maxBalancedPrefix("((()())())((") === 10)
// console.log(maxBalancedPrefix("()(())((()") === 6)


/**
 * longestValidParentheses
 */
function longestValidParentheses(s) {
    let leftCount = 0;
    let rightCount = 0;
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            leftCount++;
        } else {
            rightCount++;
        }

        if (leftCount === rightCount) {
            max = Math.max(max, 2 * rightCount);
        } else if (rightCount > leftCount) {
            leftCount = rightCount = 0;
        }
    }

    leftCount = rightCount = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ')') {
            rightCount++;
        } else {
            leftCount++;
        }

        if (leftCount === rightCount) {
            max = Math.max(max, 2 * leftCount);
        } else if (leftCount > rightCount) {
            leftCount = rightCount = 0;
        }
    }

    return max;
}
// console.log(longestValidParentheses(")()())") === 4)
// console.log(longestValidParentheses("(()") === 2)
// console.log(longestValidParentheses("") === 0)

/**
 * 
 */
function mergeSortedLists(l1, l2) {
    let newList = [];
    const l1Length = l1.length;
    const l2Length = l2.length;
    let first = 0;
    let second = 0;

    while (first < l1Length && second < l2Length) {
        if (l1[first] < l2[second]) {
            newList.push(l1[first]);
            first++;
        } else {
            newList.push(l2[second]);
            second++;
        }
    }
        
    while (first < l1Length) {
        newList.push(l1[first]);
        first++;
    }

    while (second < l2Length) {
        newList.push(l2[second]);
        second++;
    }

    return newList
}
// console.log(mergeSortedLists([1,2,3], [4,5,6]), [1,2,3,4,5,6])
// console.log(mergeSortedLists([1,2,3], [2,5,6]), [1,2,2,3,5,6])


/**
 * Design a system that evaluates the effectiveness of a Google add campaign.
 * How would you release a fix for a SDK?
 */

/**
 * Grid BFS and sorting related problem
 */

/*
*A hard DFS leetCode question. 
*/


/**
 * Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

Input: grid = [[0,1],[1,0]]
Output: 2

Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4

Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1

 */
const moves = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { y: 0, x: -1 },
    { y: 0, x: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { y: 1, x: -1 },
    { y: -1, x: -1 },
]
const ableToMove = (grid, x, y) => {
    return (
        x >= 0 && 
        x < grid.length && 
        y >= 0 && 
        y < grid.length && 
        grid[y][x] === 0
    );
}
var shortestPathBinaryMatrix = function(grid) {
    const len = grid.length - 1;

    // start or end point is === 1 (or evals to true) no path
    if (Boolean(grid[0][0]) || Boolean(grid[len][len])) return -1;

    // queue with default first x,y grid element 
    const queue = [
        {
            x: 0,
            y: 0,
            count: 1
        }
    ];
    
    // set to 1, to indicate first point has already been seen
    grid[0][0] = 1;

    while (queue.length > 0) {
        const { x, y, count } = queue.shift();
        // if x & y === len, we have reached end of grid, return count
        if (x === len && y === len) {
            return count;
        } else {
            for (const move of moves) {
                const nextX = x + move.x;
                const nextY = y + move.y;
                // if able to move to next coords, push to queue and increase count
                if (ableToMove(grid, nextX, nextY)) {
                    queue.push({
                        x: nextX,
                        y: nextY,
                        count: count + 1
                    })
                    // mark this point as already seen
                    grid[nextY][nextX] = 1;
                }
            }
        }
    }
    return -1
};

/**
 * Context
Given a  2D Array, :

1 1 1 0 0 0
0 1 0 0 0 0
1 1 1 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
We define an hourglass in  to be a subset of values with indices falling in this pattern in 's graphical representation:

a b c
  d
e f g
There are  hourglasses in , and an hourglass sum is the sum of an hourglass' values.

Task
Calculate the hourglass sum for every hourglass in , then print the maximum hourglass sum.

Example

In the array shown above, the maximum hourglass sum is  for the hourglass in the top left corner.

Input Format

There are  lines of input, where each line contains  space-separated integers that describe the 2D Array .

Constraints

Output Format

Print the maximum hourglass sum in .
 */

const hourGlassMax = (arr) => {
    let hourGlassTotals = [];
    for (let row = 0; row < 4; row++) {
        for (let i = 0; i < 4; i++) {
            hourGlassTotals.push(
                arr[row][i] + arr[row][i + 1] + arr[row][i + 2] +
                arr[row + 1][i + 1] +
                arr[row + 2][i] + arr[row + 2][i + 1] + arr[row + 2][i + 2]
            )
        }
    }
    return Math.max(...hourGlassTotals);
}
const input = [
    [1, 1, 1, 0, 0, 0 ],
    [0, 1, 0, 0, 0, 0 ],
    [1, 1, 1, 0, 0, 0 ],
    [0, 0, 2, 4, 4, 0 ],
    [0, 0, 0, 2, 0, 0 ],
    [0, 0, 1, 2, 4, 0 ],
]
// console.log(hourGlassMax(input) === 19)


/**
 * Given a multi-dimensional array of numbers from 1-9, write a function that returns a multi-dimensional 
 * array where any consecutive numbers of at least length 3, get replaced with 0s. Numbers may be consecutive 
 * both horizontally or vertically.
 * 
 * [
 *  [2, 3, 5, 6, 7],
 *  [2, 4, 5, 9, 8],
 *  [5, 6, 7, 2, 3],
 *  [4, 5, 4, 5, 4],
 *  [3, 4, 5, 5, 5]
 * ]
 */

const isConsecutive = (nums) => {
    if (
        nums[0] + 1 === nums[1] &&
        nums[1] + 1 === nums[2]
    ) {
        return true;
    }
    return false;
};

const cleanMulti = (arr) => {
    let res = [];

    // build empty copy of arr
    for (let i = 0; i < arr.length; i++) {
        res.push(new Array(arr.length).fill(null));
    }

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr.length; col++) {
            const horizontalTriplet = [arr[row][col], arr[row][col + 1], arr[row][col + 2]];
            if (isConsecutive(horizontalTriplet)) {
                res[row][col] = 0;
                res[row][col + 1] = 0;
                res[row][col + 2] = 0;
                col += 2
            } else if (res[row][col] === null) {
                res[row][col] = arr[row][col];
            }
            if (row < 3) {
                const verticalTriplet = [arr[row][col], arr[row + 1][col], arr[row + 2][col]];
                if (isConsecutive(verticalTriplet)) {
                    res[row][col] = 0;
                    res[row + 1][col] = 0;
                    res[row + 2][col] = 0;
                }
            }
        }   
    }
    return res;
}
const input2 = [
  [2, 3, 5, 6, 7],
  [2, 4, 5, 6, 8],
  [5, 6, 7, 7, 3],
  [4, 5, 4, 2, 4],
  [3, 4, 5, 9, 5]
];
// console.log(cleanMulti(input2))

/**
 * 
 * 
 * Example: Given an array of integers of size ‘n’, Our aim is to calculate the maximum sum of ‘k’ consecutive elements in the array.

Input  : arr[] = {100, 200, 300, 400}, k = 2
Output : 700

Input  : arr[] = {1, 4, 2, 10, 23, 3, 1, 0, 20}, k = 4 
Output : 39
We get maximum sum by adding subarray {4, 2, 10, 23} of size 4.

Input  : arr[] = {2, 3}, k = 3
Output : Invalid
There is no subarray of size 3 as size of whole array is 2.
 * 
 * 
 * 
 */

const calcMaxSizeOfK = (arr, k) => {
    // base case
    if (arr.length < k) return -1;

    let start = 0;
    let end = start + (k -1);
    let totals = [];

    while (end < arr.length) {
        const values = arr.slice(start, end + 1);
        const sum = values.reduce((a, b) => a + b);
        totals.push(sum);
        start++;
        end++;
    }

    return Math.max(...totals);
};

console.log(calcMaxSizeOfK([100, 200, 300, 400], 2) === 700)
console.log(calcMaxSizeOfK([1,4,2,10,23,3,1,0,20], 4) === 39)
console.log(calcMaxSizeOfK([2,3], 3) === -1)