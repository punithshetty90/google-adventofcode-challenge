const input = document.querySelector('pre').textContent.trim().split('\n');
const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

const occurencesSet = (inputStr) => {
    let counts = new Set();
    inputStr.split('').reduce((counts, char) => {
        counts.add(char);
        return counts;
    }, counts);

    return counts;
}

const getValue = (letter) => letter.charCodeAt(0) - 96 > 0 ? letter.charCodeAt(0) - 96 : letter.charCodeAt(0) - 38;

function getIntersection(setA, setB) {
    const intersection = [...setA].filter(element => setB.has(element))
    return intersection;
}

let part1Arr = [];
input.map((stringVal) => {
    const partOne = stringVal.slice(0, stringVal.length / 2);
    const partTwo = stringVal.slice(stringVal.length / 2, stringVal.length);

    const partOneSet = occurencesSet(partOne);
    const partTwoSet = occurencesSet(partTwo);
    const intersection = getIntersection(partOneSet, partTwoSet);

    part1Arr.push(intersection);

});

const part1 = part1Arr.flat().map((letter) => {
    return getValue(letter);
});

console.log(`Part 1: ${arraySum(part1)}`);

let part2Arr = [];
let newStr = '';
input.map((stringVal, index) => {

    if((index+1)%3 == 0){
        const partOne = input[index-2];
        const partTwo = input[index-1];
        const partThree = input[index];

        const partOneSet = occurencesSet(partOne);
        const partTwoSet = occurencesSet(partTwo);
        const partThreeSet = occurencesSet(partThree);

        const intersection12 = getIntersection(partOneSet, partTwoSet);
        const intersection = getIntersection(intersection12, partThreeSet);

        part2Arr.push(intersection);
    }
});

const part2 = part2Arr.flat().map((letter) => {
    return getValue(letter);
});
console.log(`Part 2: ${arraySum(part2)}`);
