/**
 * Count points for each key val pair
 * string, boolean, arrays, numbers -> 1
 * Objects are dependent on the values inside
 */

const calcValue = (obj) => {
    let totalValue = 0;
    for (let key in obj) {
        let value = obj[key];
        if (
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            totalValue += calcValue(value);
        } else {
            totalValue++;
        }
    }
    return totalValue;
};

const payload = {
    name: 'Tom',
    email: 'tsand@gmail.com',
    colours: ['red', 'yellow'],
    teams: {
        name: 'Joes',
        league: 'Big L',
        colours: {
            primary: 'purple',
            secondary: 'purple'
        }
    },
    test: 'alive'
}
// console.log(calcValue(payload) === 7);

/**
 * Update from Diff
 * Given orignal obj (see payload above)
 * and diff
 * 
 * update all incoming net new fields from diff
 * remove any that are null in diff
 * 
 * return updated obj
 * 
 */

const update = (user, diff) => {
    for (let key in diff) {
        const diffValue = diff[key];
        if (!user[key]) {
            user[key] = diffValue;
        } else if (diff[key] === null && user[key]) {
            delete user[key]
        } else if (
            !Array.isArray(diff[key]) &&
            typeof diff[key] === 'object'
        ) {
            user[key] = update(user[key], diff[key]);
        } else {
            user[key] = diff[key];
        }
    }
    return user;
};

const diff = {
    lastName: 'Glover',
    email: 'another@gmail.com',
    colours: ['blue', 'green'],
    teams: {
        name: 'fhjdkis',
        league: 'Small O',
    },
    test: null
};

// console.log(update(payload, diff))

/**
 * Show the difference between a user and a diff
 * see payload and diff from above
 */

const indent = (insideObject, str) => {
    if (insideObject) {
        str = ' '.repeat(2) + str;
    }
    return str;
}

const showChanges = (user, diff, inside = false) => {
    let changeLog = '';
    for (const key in diff) {
        const diffValue = diff[key];
        if (!user[key]) {
            changeLog += indent(inside, `+ ${key}: ${diffValue}`);
            user[key] = diffValue;
        } else if (diff[key] === null && user[key]) {
            changeLog += indent(inside, `- ${key}: ${user[key]} \n`);
            delete user[key]
        } else if (
            !Array.isArray(diff[key]) &&
            typeof diff[key] === 'object'
        ) {
            changeLog += `${key}: { \n` 
            changeLog += `${showChanges(user[key], diff[key], true)}`
            changeLog += `}`
            user[key] = showChanges(user[key], diff[key], false);
        } else {
            changeLog += indent(inside, `- ${key}: ${user[key]} \n`);
            changeLog += indent(inside, `+ ${key}: ${diff[key]}`);
            user[key] = diff[key];
        }
        changeLog += '\n'
    }
    return changeLog;
}


const diff2 = {
    lastName: 'Glover',
    colours: null,
    teams: {
        name: 'fhjdkis',
        colours: {
            primary: 'Gold',
            secondary: null
        }
    },
};
console.log(showChanges(payload, diff));
// console.log(showChanges(payload, diff2));