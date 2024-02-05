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


const justify = (words, maxWidth) => {

};

/**
 * Flatten N-Dimensional Array to 1D Array
 */


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
function isBalanced(exp) {
    let count = 0;
    for (const el of exp) {
        if (el === '(') {
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

console.log(isBalanced("((()))()()") === true);
console.log(isBalanced("())((())") === false);

/**
 * Find maximum depth of nested parenthesis in a string
 */
function maxDepth(str) {
    let stack = [];
    let count = 0;
    let totalCount = 0;

    for (let char of str) {
        if (char === '(') {
            count++;
            stack.push(char);
            if (count > totalCount) {
                totalCount = count;
            }
        } else if (char === ')') {
            let open = stack.pop();
            if (count > 0 && open === '(') {
                count--;
            } else {
                return -1;
            }
        }
    }
    //Again check for balanced parentheses
    if(stack.length !== 0){
        return -1;
    }
    
    //Return total
    return totalCount; 
};

console.log(maxDepth("( a(b) (c) (d(e(f)g)h) I (j(k)l)m)") === 4);
console.log(maxDepth("( p((q)) ((s)t) )") === 3);
console.log(maxDepth("") === 0);
console.log(maxDepth("b) (c) ()") === -1);

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
 
    for (var i = 0; i < str.length - 1; i++) {
        if (str[i] == '(') {
            sum += 1;
        } else {
            sum -= 1;
        }

        if (sum < 0) {
            break;
        }
 
        if (sum == 0) {
            maxi = i + 1;
        }
    }
    return maxi;
}

console.log(maxBalancedPrefix("((()())())((") === 10)
console.log(maxBalancedPrefix("()(())((()") === 6)


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
console.log(longestValidParentheses(")()())") === 4)
console.log(longestValidParentheses("(()") === 2)
console.log(longestValidParentheses("") === 0)

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
console.log(mergeSortedLists([1,2,3], [4,5,6]), [1,2,3,4,5,6])
console.log(mergeSortedLists([1,2,3], [2,5,6]), [1,2,2,3,5,6])


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