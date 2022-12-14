const inputText = document.querySelector('pre').textContent.trim().split('');
const getStartOfMessageMarker = (input, distinctChar) => {
    const map = new Map();

    let answer = 0;
    let start = 0;
    let end = 0;

    input.map((value, index, array) => {
        let val = 1;
        if(map.has(value) ) {
            val = map.get(value);
            val ++;
        }
        map.set(value, val);
        end = index;

        if((end-start) == (distinctChar-1)){
            let size = map.size;
            if(size == distinctChar){
                answer = end+1;
                return;
            }
            let val1 = map.get(input[start]);
            val1--;
            if(val1 == 0){
                map.delete(input[start]);
            }else{
                map.set(input[start], val1);
            }
            start++;
        }
    });
return answer;
}

console.log(`First part: ${getStartOfMessageMarker(inputText, 4)}`);
console.log(`Second part: ${getStartOfMessageMarker(inputText, 14)}`);