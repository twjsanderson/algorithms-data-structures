/**
 * CC validator
 * 1. convert string to reversed array of nums with no white space
 * 2. loop forward, increment by 2
 * 3. Add each num to sum
 * 4. get next digit * 2
 * 5. if next digit is available, add it
 * 6. if it is > 9, subtract from sum
 * 7. return sum % 10 === 0
 */

const isValid = (cc) => {
    let reversedCC = cc
        .replaceAll(/\s/g,'')
        .split('')
        .map(digit => Number(digit))
        .reverse();
    let sum = 0;
    for (let i = 0; i < reversedCC.length; i += 2) {
        sum += reversedCC[i];
        const nextDigit = reversedCC[i + 1] * 2;
        if (nextDigit) {
            sum += nextDigit;
            if (nextDigit > 9) {
                sum -= 9;
            }
        }
    }
    return sum % 10 === 0;
}

// console.log(isValid("79927398713"))
// console.log(isValid("5156230000000004"))
// console.log(isValid(" 414901150 0000147"))
// console.log(isValid('4111111111111112')) // should be invalid

/**
 * prefix solve for tech screening
 */
// let card = '23235432432';

// const prefixes = [23, '62235-63400', '100-180', 789];

//... previous code
// for (let prefix of prefixes) {
//     if (typeof prefix === 'string') {
//         const range = prefix.split('-').map(el => Number(el));
//         const rangeSize = prefix.split('-').map(el => el.length)
//         const prefixSize = Math.max(...rangeSize)
//         const currPrefix = card.slice(0, prefixSize);
//         if (currPrefix >= range[0] && currPrefix <= range[1]) {
//             console.log(true);
//         }
//     } else {
//         const prefixSize = prefix.toString().length
//         console.log(true);
//     }
//     console.log(false);
// }
//... more code

/**
 * 
 * validation of credit card in javascript and determine its type.
 * 
 * Response Format:
 *  message
 *  success
 *  type
 * 
 */

const response = (success, message = null, type = null) => {
    return {
        success,
        message,
        type
    }
}
const isValidCardType = (cardNumber) => {

    // Success Message
    const success = 'Credit Card is of valid type';

    //Error messages
    const ccErrors = [];
    ccErrors [0] = "Unknown card type";
    ccErrors [1] = "No card number provided";
    ccErrors [2] = "Credit card number is in invalid format";
    ccErrors [3] = "Credit card number is invalid";
    ccErrors [4] = "Credit card number has an inappropriate number of digits";
    ccErrors [5] = "Warning! This credit card number is associated with a scam attempt";


    const scamNumbers = [
        '5490997771092064'
    ];
        
    // Define the cards we support. You may add additional card types as follows.
    
    //  Name:         As in the selection box of the form - must be same as user's
    //  Length:       List of possible valid lengths of the card number for the card
    //  prefixes:     List of possible prefixes for the card
    //  checkdigit:   Boolean to say whether there is a check digit

    const cards = [];
    cards [0] = {name: "Visa", 
                length: "13,16", 
                prefixes: "4",
                checkdigit: true};
    cards [1] = {name: "MasterCard", 
                length: "16", 
                prefixes: "51,52,53,54,55",
                checkdigit: true};
    cards [2] = {name: "DinersClub", 
                length: "14,16", 
                prefixes: "36,38,54,55",
                checkdigit: true};
    cards [3] = {name: "CarteBlanche", 
                length: "14", 
                prefixes: "300,301,302,303,304,305",
                checkdigit: true};
    cards [4] = {name: "AmEx", 
                length: "15", 
                prefixes: "34,37",
                checkdigit: true};
    cards [5] = {name: "Discover", 
                length: "16", 
                prefixes: "6011,622,64,65",
                checkdigit: true};
    cards [6] = {name: "JCB", 
                length: "16", 
                prefixes: "35",
                checkdigit: true};
    cards [7] = {name: "enRoute", 
                length: "15", 
                prefixes: "2014,2149",
                checkdigit: true};
    cards [8] = {name: "Solo", 
                length: "16,18,19", 
                prefixes: "6334,6767",
                checkdigit: true};
    cards [9] = {name: "Switch", 
                length: "16,18,19", 
                prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
                checkdigit: true};
    cards [10] = {name: "Maestro", 
                length: "12,13,14,15,16,18,19", 
                prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
                checkdigit: true};
    cards [11] = {name: "VisaElectron", 
                length: "16", 
                prefixes: "4026,417500,4508,4844,4913,4917",
                checkdigit: true};
    cards [12] = {name: "LaserCard", 
                length: "16,17,18,19", 
                prefixes: "6304,6706,6771,6709",
                checkdigit: true};

    // trim white space
    const cleanNumber = cardNumber.replaceAll(/\s/g,'');

    const cardLength = cleanNumber.length;

    // no card given
    if (cardLength === 0) return response(false, ccErrors[1]);
    
    // is valid?
    if (!isValid(cleanNumber)) return response(false, ccErrors[2]);

    // is scam number?
    if (scamNumbers.includes(scamNumbers)) return response(false, ccErrors[5]);

    // Check if card belongs to any organization
    let matchOrgLength = false;
    let matchOrgPrefix = false;
    for (const card of cards) {

        // does card length match org length(s)?
        const orgLengths = card.length.split(',').map(num => Number(num));
        if (orgLengths.includes(cardLength)) {
            matchOrgLength = true;
        }

        // does prefix belong to org?
        const orgPrefixes = card.prefixes.split(',').map(num => Number(num));
        const longestPrefix = Math.max(...orgPrefixes).toString().length;
        const customerCC = Number(cleanNumber.slice(0, longestPrefix));
        if (orgPrefixes.includes(customerCC)) {
            matchOrgPrefix = true
        }
        if (matchOrgLength && matchOrgPrefix) return response(true, success, card.name);

    }
    
    if (!matchOrgPrefix) return response(false, ccErrors[3]);
    if (!matchOrgLength) return response(false, ccErrors[4]);

    // The credit card is in the required format
    return response(true, null, 'Unknown');

};

console.log(isValidCardType(''));
console.log(isValidCardType('3493 003 8656 069'));
console.log(isValidCardType('3493 7003 8656 069'));
console.log(isValidCardType('3000 0000 0000 04'))


const state = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null,    2, null, null,    2, null],
    [null,    1,    1,    1,    2,    1, null],
    [null,    1,    2,    2,    1,    2, null],
    [null,    1,    2,    2,    1,    2,    1]
];


const validateWin = (board) => {
    let points = {};
    const players = [1, 2];
    for (const player of players) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const coord = board[row][col];
                if (coord !== null && coord === player) {
                    if (!points[player]) {
                        points[player] = [];
                    }
                    points[player].push([row, col]);
                }
            }
        }
    }

    const initialPlayer1Points = points[players[0]];
    const initialPlayer2Points = points[players[1]];

    if (!initialPlayer1Points && !initialPlayer2Points) return -1;

    const player1Points = initialPlayer1Points ? 
        points[1]
            .sort((a, b) => a[0] - b[0])
            .map(arr => Number(arr.join('')))
        : [];
    
    const player2Points = initialPlayer2Points ?
        points[2]
            .sort((a, b) => a[0] - b[0])
            .map(arr => Number(arr.join('')))
        : [];

    const currPlayerPoints = {
        'Player 1': player1Points, 
        'Player 2': player2Points
    };

    for (const playerName in currPlayerPoints) {
        const points = currPlayerPoints[playerName];
        for (let i = 0; i < points.length - 1; i++) {
            let horizontalCount = 1;
            let verticalCount = 10;
            let negativeAngle = 11;
            let positiveAngle = 9;
            for (let j = i + 1; j < points.length; j++) {
                if (points[i] + horizontalCount === points[j]) horizontalCount++;
                if (points[i] + verticalCount === points[j]) verticalCount += 10;
                if (points[i] + negativeAngle === points[j]) negativeAngle += 11;
                if (points[i] + positiveAngle === points[j]) positiveAngle += 9;
                if (
                    horizontalCount === 4 ||
                    verticalCount / 10 === 4 ||
                    negativeAngle / 11 === 4 ||
                    positiveAngle / 9 === 4
                ) return `${playerName} wins!`;
            }
            horizontalCount = 0;
            verticalCount = 0;
            negativeAngle = 0;
            positiveAngle = 0;
        }
    }
    return -1;
};

const board1 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null,    2, null, null,    2, null],
    [null,    1,    1,    1,    2,    1, null],
    [null,    1,    2,    2,    1,    2, null],
    [null,    1,    2,    2,    1,    2,    1]
]
// console.log(validateWin(board1) === 'Player 2 wins!'); // positive angle

const board2 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null,    2, null, null,    2, null],
    [null,    1,    1,    1,    2,    2, null],
    [null,    1,    2,    1,    1,    2, null],
    [null,    1,    2,    2,    1,    2,    1]
]
// console.log(validateWin(board2) === 'Player 2 wins!'); // vertical

const board3 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null,    2, null, null,    1, null],
    [null,    1,    1,    2,    2,    1, null],
    [null,    1,    2,    1,    2,    1, null],
    [null,    1,    2,    2,    1,    2,    1]
]
// console.log(validateWin(board3) === 'Player 2 wins!'); // negative angle

const board4 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null,    2, null, null,    1, null],
    [null,    2,    1,    2,    2,    2,    2],
    [null,    1,    2,    1,    2,    1,    1],
    [   1,    1,    2,    2,    1,    1,    1]
]
// console.log(validateWin(board4) === 'Player 2 wins!'); // horizontal

const board5 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]
// console.log(validateWin(board5) === -1); // no winner

const board6 = [
    [   1, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]
// console.log(validateWin(board6) === -1); // no winner, only Player 1

const board7 = [
    [   2, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]
// console.log(validateWin(board7) === -1); // no winner, only Player 2

const board8 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [   2,    2,    2, null, null, null, null],
    [   1,    1,    1,    1, null, null, null]
]
// console.log(validateWin(board8) === 'Player 1 wins!'); // horizontal

const board9 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [   1, null, null, null, null, null, null],
    [   1, null, null, null, null, null, null],
    [   1,    2, null, null, null, null, null],
    [   1,    2,    2, null, null, null, null]
]
// console.log(validateWin(board9) === 'Player 1 wins!'); // vertical

const board10 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [   1, null, null,    1, null, null, null],
    [   2,    1,    1,    2, null, null, null],
    [   1,    1,    2,    2, null, null, null],
    [   1,    2,    2,    2, null, null, null]
]
// console.log(validateWin(board10) === 'Player 1 wins!'); // positive angle

const board11 = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [   1, null, null,    2, null, null, null],
    [   2,    1,    1,    1, null, null, null],
    [   2,    1,    1,    2, null, null, null],
    [   1,    2,    2,    1, null, null, null]
]
// console.log(validateWin(board11) === 'Player 1 wins!'); // negative angle

const board12 = [
    [   2,    1,    2,    1,    1,    2,    1],
    [   1,    2,    1,    1,    2,    2,    1],
    [   1,    2,    2,    2,    1,    2,    2],
    [   2,    1,    1,    1,    2,    1,    1],
    [   2,    1,    2,    1,    2,    1,    2],
    [   1,    2,    2,    1,    2,    2,    2]
]
// console.log(validateWin(board12) === -1); // full board, no winner






/**
 * create board and enable players to make moves
 *
 */
const vertical = (grid, player, col) => {
    let count = 0;
    for (let i = grid.length; i >= 0; i--) {
        if (count === 4) return true;
        if (grid[i] && grid[i][col] === player) {
            count++;
        } else {
            count = 0;
        }
    }
    return false;
    
}

const horizontal = (grid, player, row) => {
    let count = 0;
    for (let i = 0; i < grid[row].length; i++) {
        if (count === 4) return true;
        if (grid[row][i] === player) {
            count++;
        } else {
            count = 0;
        }
    }
    return false;
}

const positiveAngle = (grid, player) => {
    for (let row = 0; row < grid.length - 3; row++) {
        for (let col = 0; col < grid[row].length - 3; col++) {
            if (
                player === grid[row][col] &&
                player === grid[row + 1][col + 1] &&
                player === grid[row + 2][col + 2] &&
                player === grid[row + 3][col + 3]
            ) return true;
        }
    }
    return false;
};

const negativeAngle = (grid, player) => {
    for (let row = 0; row < grid.length - 3; row++) {
        for (let col = 3; col < grid[row].length; col++) {
            if (
                player === grid[row][col] &&
                player === grid[row + 1][col - 1] &&
                player === grid[row + 2][col - 2] &&
                player === grid[row + 3][col - 3]
            ) return true;
        }
    }
    return false;
};

const connectTest = (grid, player) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === player) {
                if (
                    vertical(grid, player, col) ||
                    horizontal(grid, player, row) ||
                    positiveAngle(grid, player) ||
                    negativeAngle(grid, player)
                ) return `${player} wins!`
            }
        }
    }
    return false;
}

const showGrid = (grid) => {
    let str = ''
    for (const row of grid) {
        for (const col of row) {
            str += ` ${col} `;
        }
        str += '\n'
    }
    return str;
}

const connectAdd = (grid, column, player) => {
    for (let i = grid.length - 1; i > 0; i--) {
        if (grid[i][column] === 0 && i !== 0) {
            grid[i][column] = player;
            return connectTest(grid, player) || grid;
        }
    }
    return 'invalid entry'
}

const makeGrid = (width, height) => {
    let grid = [];
    for (let i = 0; i < height; i++) {
        grid.push(new Array(width).fill(0));
    }
    return grid;
}



const grid = makeGrid(7, 6)
let g1 = connectAdd(grid, 2, "a")
let g2 = connectAdd(g1, 3, "b");
let g3 = connectAdd(g2, 3, "a");
let g4 = connectAdd(g3, 4, "b");
let g5 = connectAdd(g4, 5, "a");      
let g6 = connectAdd(g5, 4, "b");
let g7 = connectAdd(g6, 4, "a");
let g8 = connectAdd(g7, 5, "b");
let g9 = connectAdd(g8, 5, "b");
let g10 = connectAdd(g9, 5, "a");
console.log(g10)