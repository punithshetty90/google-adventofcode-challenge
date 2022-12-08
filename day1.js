const input = document.querySelector('pre').textContent.trim();
const elves = input.split('\n\n').map(bag => bag.split('\n'));

const arraySum = (arrayInput) => arrayInput.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);

let max = 0;
const innerArraySum = elves.map((elf)=> {
    const sum = arraySum(elf);
    max = Math.max(sum, max);
    return sum;
});
console.log(`Part 1: ${max}`);
console.log(`Part 2: ${arraySum(innerArraySum.sort().reverse().slice(0, 3))}`);