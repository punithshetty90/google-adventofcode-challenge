const input = document.querySelector('pre').textContent.trim().split('\n');

const TrieNode = function (name) {

    this.name = name;
    this.parent = null;
    this.children = {};
    this.fileSize = 0;
    this.isFile = false;

    this.getWord = function() {
        let output = [];
        let node = this;

        while (node !== null) {
            output.unshift(node.name);
            node = node.parent;
        }

        return output.join('/');
    };
}

class Trie{
    constructor(){
        this.root = new TrieNode("/");
        this.current = this.root;
    }

    insert(filesDirArr) {
        let node = this.current;
        const type = getType(filesDirArr);
        if (!node.children[filesDirArr[1]]) {
            node.children[filesDirArr[1]] = new TrieNode(filesDirArr[1]);
            node.children[filesDirArr[1]].parent = node;
        }

        node = node.children[filesDirArr[1]];
        if (type == 'file') {
            node.isFile = true;
            node.fileSize = parseInt(filesDirArr[0]);
        }
    }
}

const trie = new Trie('/');

const constructTrie = (lines) => {

    lines.forEach(line => {
        const parts= line.split(' ');
        const firstPart = parts[0];
        switch (firstPart) {
            case '$':
                if (parts[1] == 'ls') {
                    return;
                }
                else {
                    if(parts[2] == '/') {
                        trie.current = trie.root;
                    }else  if(parts[2] == '..') {
                        let node = trie.current.parent;
                        trie.current = node;
                    }else {
                        let node = trie.current.children[parts[2]]
                        trie.current = node;
                    }
                }
                break;
            default:
                trie.insert(parts);
        }
    })
}

const getType = (parts) => {
    const firstPart = parts[0];
    if(firstPart == 'dir') {
        return 'dir';
    }else{
        return 'file';
    }
};

constructTrie(input);

let weighstObj = {};

const findWeightOfNode = (node, sum) => {
    if(node.isFile){
        sum += parseInt(node.fileSize);
        return sum;
    }

    let sum1 = 0;
    Object.keys(node.children).forEach(function(key, index) {
        sum1 += findWeightOfNode(node.children[key], sum);
            weighstObj[node.getWord()] = sum1;
    });
    return sum + sum1;
};

findWeightOfNode(trie.root,0)

let part1 = 0;
Object.fromEntries(Object.entries(weighstObj).
filter(([key, val]) => {
    if(val<100000){
        part1 += val
    }
}));
console.log(`First part: ${part1}`);

let weightObj1 = {};
let rootWeight = weighstObj['/'];

let unusedSpaceReq = 30000000 - (70000000 - parseInt(rootWeight) );
let smallest = 70000001;

Object.fromEntries(Object.entries(weighstObj).
filter(([key, val]) => {
        if(val >= unusedSpaceReq){
            weightObj1[key] = val;
            smallest = Math.min(smallest, weightObj1[key]);
        }

}));

console.log(`Second part: ${smallest}`);





