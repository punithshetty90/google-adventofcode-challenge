const getInput = () => document.querySelector('pre').textContent.trim().split('\n\n');

class Queue extends Array {
    insertFront(val) {
        this.unshift(val);
    }

    insertTop(val) {
        this.push(val);
    }


    removeTop() {
        return this.pop();
    }

    getLast() {
        return this[this.length-1];
    }

    isEmpty() {
        return this.length === 0;
    }
}

// Construct the stack/queue
let firstHalf = getInput()[0].split('\n');

firstHalf.pop();
let boxArray = [];
let boxArray1 = [];

firstHalf.map( (value, index, array) => {
        let inputArray = value.split(/\s\s\s\s/).map(input => input.split(' ')).flat();
        inputArray.map((value1, index1, array1)=>{

            if(value1 != ''){
                let queue = new Queue();
                let queue1 = new Queue();

                if(boxArray[index1]){
                    queue = boxArray[index1];
                }
                if(boxArray1[index1]){
                    queue1 = boxArray1[index1];
                }

                queue.insertFront(value1);
                queue1.insertFront(value1);

                boxArray[index1] = queue;
                boxArray1[index1] = queue1;

            }
        });
});

let secondHalf = getInput()[1].split('\n');

secondHalf.map( (value, index, array) => {
    const regex = /\d+/g;
    const matches = value.match(regex);

    let numOfItems = matches[0];
    const from = matches[1];
    const to = matches[2];

    let fromQ = boxArray[from-1];
    let toQ = boxArray[to-1];
    while(numOfItems > 0) {
        if(!fromQ.isEmpty()){
            let removedFrom = fromQ.removeTop();
            if(removedFrom) {
                toQ.insertTop(removedFrom);
            }
        }
        numOfItems--;
    }
    boxArray[from-1] = fromQ;
    boxArray[to-1] = toQ;

});

let part1Answer = '';
let part1 = boxArray.map((queue)=>{
    part1Answer += queue.getLast().toString();
});

console.log('Part 1: '+ part1Answer.replaceAll('[','').replaceAll(']',''));

secondHalf.map( (value, index, array) => {
    const regex = /\d+/g;
    const matches = value.match(regex);

    let numOfItems = matches[0];
    const from = matches[1];
    const to = matches[2];

    let fromQ = boxArray1[from-1];
    let toQ = boxArray1[to-1];

    let removedItems = new Queue();
    while(numOfItems > 0) {
        if(!fromQ.isEmpty()){
            let removedFrom = fromQ.removeTop();
            if(removedFrom) {

                removedItems.insertFront(removedFrom);
            }
        }
        numOfItems--;
    }
    toQ.push(removedItems);
    boxArray1[from-1] = fromQ;
    boxArray1[to-1] = toQ.flat();
});

let part2Answer = '';
let part2 = boxArray1.map((queue)=>{
    part2Answer += queue.getLast().toString();
});

console.log('Part 2: '+ part2Answer.replaceAll('[','').replaceAll(']',''));