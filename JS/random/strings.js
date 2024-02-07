/**
 * Are parentheses balanced?
 */
function isBalanced(str) {
    let stack = [];
    for (const char of str) {
        if (char === '(') {
            stack.push(char)
        } else if (stack.pop() !== '(') {
            return false;
        }
    }
    return stack.length === 0 ? true : false;
}

console.log(isBalanced("((()))()()") === true);
console.log(isBalanced("())((())") === false);
console.log(isBalanced("( () () () ) ()") === false);

/**
 * Find maximum depth of nested parenthesis in a string
 */
function maxDepth(str) {
    let stack = []
        depth = 0,
        max = 0;
    for (const char of str) {
        if (char === '(') {
            depth++;
            stack.push(char);
            max = Math.max(max, depth);
        } else {
            const open = stack.pop();
            if (open === '(' && depth > 0) {
                depth--;
            } else {
                return -1;
            }
        }
    }
    return max;

}

// console.log(maxDepth("(()()((()))(()))") === 4);
// console.log(maxDepth("((())(()))") === 3);
// console.log(maxDepth("") === 0);
// console.log(maxDepth(")()()") === -1);


/**
 * Max Breadth of Brackets (need depth for breadth)
 */
function maxBreadth(str) {
    let stack = [],
        depth = 0,
        max = 0,
        breadths = {};
    for (const char of str) {
        if (char === '(') {
            depth++;
            stack.push(char);
            max = Math.max(depth, max);
            if (breadths[depth]) {
                breadths[depth]++;
            } else {
                breadths[depth] = 1;
            }
        } else if (char === ')') {
            const open = stack.pop();
            if (open === '(' && depth > 0) {
                depth--;
            } else {
                return -1;
            }
        }
    }
    if (stack.length !== 0) return -1;

    return {
        'maxDepth': max,
        'maxBreadth': Math.max(...Object.values(breadths))
    } 
}

const one = maxBreadth("( () () () ) ()");
console.log(one.maxDepth === 2, one.maxBreadth === 3);
const two = maxBreadth("(()()((()))(()))");
console.log(two.maxDepth === 4, two.maxBreadth === 4);