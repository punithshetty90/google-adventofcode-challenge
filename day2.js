const input = document.querySelector('pre').textContent.trim().split('\n');
const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

const opponent1 = input.map(values => values.split(' ')[0]);

//Convert X -> A, Y -> B, Z -> C
let opponent2 = input.map(values => {
    const xToA = (letter) => String.fromCharCode(letter.charCodeAt(0) - 23);
    return xToA(values.split(' ')[1]);
});


const getGameScore = (value1, value2) => {
    if (value1 == value2) {
        return 3;
    } else if ((value1 == 'C' && value2 == 'A') || (value1 == 'A' && value2 == 'B') || (value1 == 'B' && value2 == 'C')) {
        return 6;
    }
    return 0;
}

const getPlayerMoveValue = (value) => {
    if (value == 'A') {
        return 1;
    }
    if (value == 'B') {
        return 2;
    }
    return 3;
}

const getGameWinValue = (opponentValue) => {
    if (opponentValue == 'A') {
        return 'B';
    } else if (opponentValue == 'B') {
        return 'C';
    } else if (opponentValue == 'C') {
        return 'A';
    }
}

const getGameLoseValue = (opponentValue) => {
    if (opponentValue == 'A') {
        return 'C';
    } else if (opponentValue == 'B') {
        return 'A';
    } else if (opponentValue == 'C') {
        return 'B';
    }
}

let results = opponent1.map((o1value, index) => {
    return (getGameScore(o1value, opponent2[index]) + getPlayerMoveValue(opponent2[index]));
});

console.log(`Part 1: ${arraySum(results)}`);


const inputFromElf = input.map(values => {
    const xToA = (letter) => String.fromCharCode(letter.charCodeAt(0) - 23);
    return xToA(values.split(' ')[1]);
});

opponent2 = opponent1.map((value1, index) => {
    const inputFromElfVal = inputFromElf[index];

    if (inputFromElfVal == 'A') {
        return getGameLoseValue(value1);
    } else if (inputFromElfVal == 'B') {
        return value1;
    } else if (inputFromElfVal == 'C') {
        return getGameWinValue(value1);
    }
});

results = opponent1.map((value1, index) => {
    return (getGameScore(value1, opponent2[index]) + getPlayerMoveValue(opponent2[index]));
});
console.log(`Part 2: ${arraySum(results)}`);
