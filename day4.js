const assignments = document.querySelector('pre').textContent.trim().split('\n');
const prep = (assignment) => assignment.split(',').map(half => half.split('-'));


const part1 = assignments.map( (assignment) => {
    const [first, second] = prep(assignment);
    if ((parseInt(first[0]) <= parseInt(second[0])  && parseInt(second[1]) <= parseInt(first[1])) ||
        (parseInt(second[0]) <= parseInt(first[0]) && parseInt(first[1]) <= parseInt(second[1]))) {
        return true;
    }
    else {
        return false;
    }
} );

console.log(`first part: ${part1.filter( (type) => type==true ).length}`);


const part2 = assignments.map( (assignment) => {
    let [first, second] = prep(assignment);
    if(parseInt(first[0]) > parseInt(second[0])) {
        [first, second] = [second, first];
    }

    if (parseInt(first[1]) >= parseInt(second[0]) ) {
        return true;
    }
    else {
        return false;
    }
} );

console.log(`second part: ${part2.filter( (type) => type==true ).length}`);