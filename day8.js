const input = document.querySelector('pre').textContent.trim().split('\n');
//const input = "30373\n25512\n65332\n33549\n35390".split('\n');
const col = input[0].length;
const row = input.length;
let rowArr = new Array(row);

input.map( (value, index, array) => {
    rowArr[index] = value.split('');
});

const checkVisiblity = (currentRow, currentCol) => {
    let value = parseInt(rowArr[currentRow][currentCol]);
    let leftVisiblity = true;
    let rightVisiblity = true;
    let topVisiblity = true;
    let bottomVisiblity = true;
    let leftVisiblityScore = 0;
    let rightVisiblityScore = 0;
    let topVisiblityScore = 0;
    let bottomVisiblityScore = 0;

    //check left side
    let leftIndex = currentCol;
    while(leftIndex > 0){
        leftIndex--;
        leftVisiblityScore++;
        if(parseInt(rowArr[currentRow][leftIndex]) >=  value) {
            leftVisiblity = false;
            break;
        }

    }

    //check right side
    let rightIndex = currentCol;
    while(rightIndex < (col-1)){
        rightIndex++;
        rightVisiblityScore++;
        if(parseInt(rowArr[currentRow][rightIndex]) >=  value) {
            rightVisiblity = false;
            break;
        }

    }

    //check top side
    let topIndex = currentRow;
    while(topIndex > 0){
        topIndex--;
        topVisiblityScore++;
        if(parseInt(rowArr[topIndex][currentCol]) >=  value) {
            topVisiblity = false;
            break;
        }

    }


    //check bottom side
    let bottomIndex = currentRow;
    while(bottomIndex < (row-1)){
        bottomIndex++;
        bottomVisiblityScore++;
        if(parseInt(rowArr[bottomIndex][currentCol]) >=  value) {
            bottomVisiblity = false;
            break;
        }

    }

    return {'visiblity': (bottomVisiblity || topVisiblity || rightVisiblity || leftVisiblity), 'score': (bottomVisiblityScore * topVisiblityScore * leftVisiblityScore * rightVisiblityScore)};
};

let part1 = 0;
let part2 = 0;
rowArr.map( (value, index) => {
    value.map( (innerValue, innerIndex) => {
        let isVisibleMap = checkVisiblity(index , innerIndex);
        if(isVisibleMap.visiblity) {
            part1++
            let score = isVisibleMap.score;
            part2 = Math.max(score, part2);
        }
        return '';
    } );
    return value;
} );

console.log(`First part: ${part1}`);
console.log(`Second part: ${part2}`);