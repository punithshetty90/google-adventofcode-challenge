const input = document.querySelector('pre').textContent.trim().split('\n');
//const input = "R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20".split('\n');


class Rope {
    constructor(head, ropeKnots) {
        this.head = head;
        this.ropeKnots = ropeKnots;
        this.tailSet = new Set();
    }
}

class Knot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


}

const updateXPositions = (rope, amount) => {
    for(let i=0;i<Math.abs(amount); i++){
        rope.head.x = (amount > 0)?rope.head.x + 1 : rope.head.x - 1;
        let currentHead = rope.head;
        let isRopeTail = false;
        for(let i=0; i<rope.ropeKnots.length ;i++){
            if(i == rope.ropeKnots.length-1) {
                isRopeTail = true;
            }
            const updatedTail = updateKnotPositions(rope, currentHead, rope.ropeKnots[i], isRopeTail);
            //console.log(`Updated head is [${currentHead.x}][${currentHead.y}] and tail is [${updatedTail.x}][${updatedTail.y}]`);
            rope.ropeKnots[i] = updatedTail;
            currentHead = rope.ropeKnots[i];

        }

    }
}

const updateYPositions = (rope, amount) => {
    for(let i=0;i<Math.abs(amount); i++){
        rope.head.y = (amount > 0)?rope.head.y + 1 : rope.head.y - 1;
        let currentHead = rope.head;
        let isRopeTail = false;
        for(let i=0; i<rope.ropeKnots.length ;i++){
            if(i == rope.ropeKnots.length-1) {
                isRopeTail = true;
            }
            const updatedTail = updateKnotPositions(rope, currentHead, rope.ropeKnots[i], isRopeTail);
            //console.log(`Updated head is [${currentHead.x}][${currentHead.y}] and tail is [${updatedTail.x}][${updatedTail.y}]`);
            rope.ropeKnots[i] = updatedTail;
            currentHead = rope.ropeKnots[i];

        }

    }
}


const updateKnotPositions = (rope, head, tail, isRopeTail) => {
    let xDist = head.x - tail.x;
    let yDist = head.y - tail.y;
    //console.log(`Old head is [${head.x}][${head.y}] and Old tail is [${tail.x}][${tail.y}]`);
    //console.log(`xdist is ${xDist} and ydist is ${yDist}`);
    //check if head is more than 1 steps above or bottom
    if( Math.abs(xDist)>1 && tail.y == head.y){
        tail.x = (xDist > 0) ? tail.x+1: tail.x-1;
    }
    //check if head is more than 1 steps left or right
    if( Math.abs(yDist)>1 && tail.x == head.x){
        tail.y = (yDist > 0) ? tail.y+1: tail.y-1;
    }
    //diagonal
    if( Math.abs(yDist) == 1 && Math.abs(xDist) > 1 ){
        tail.y = (yDist > 0) ? tail.y+1: tail.y-1;
        tail.x = (xDist > 0) ? tail.x+1: tail.x-1;
    }
    if( Math.abs(xDist) == 1 && Math.abs(yDist) > 1 ){
        tail.y = (yDist > 0) ? tail.y+1: tail.y-1;
        tail.x = (xDist > 0) ? tail.x+1: tail.x-1;
    }
    if( Math.abs(xDist) > 1 && Math.abs(yDist) > 1 ){
        tail.y = (yDist > 0) ? tail.y+1: tail.y-1;
        tail.x = (xDist > 0) ? tail.x+1: tail.x-1;
    }
    if(isRopeTail){
        rope.tailSet.add(`${tail.x} ${tail.y}`)
    }

    return tail;

}







const ropeKnotList1 = [new Knot(0,0), new Knot(0,0)];
const head1 = ropeKnotList1[0];
ropeKnotList1.shift();
const part1Rope = new Rope(head1, ropeKnotList1);

const answer = (input, rope) => {
    input.map( (value, index) => {
        let [direction, steps] = value.split(' ');
        steps = parseInt(steps);

        switch(direction) {
            case 'U':
                updateXPositions(rope, steps);
                break;
            case 'D':
                updateXPositions(rope, -steps);
                break;
            case 'R':
                updateYPositions(rope, steps);
                break;
            case 'L':
                updateYPositions(rope, -steps);
                break;
        }
    });
    return rope.tailSet;
}


console.log(`Part 1 is: ${answer(input,part1Rope).size}`);



const ropeKnotList2 = [new Knot(0,0), new Knot(0,0),new Knot(0,0), new Knot(0,0),new Knot(0,0), new Knot(0,0),new Knot(0,0), new Knot(0,0),new Knot(0,0), new Knot(0,0)];
const head2 = ropeKnotList2[0];
ropeKnotList2.shift();
const part2Rope = new Rope(head2, ropeKnotList2);
console.log(`Part 2 is: ${answer(input,part2Rope).size}`);

