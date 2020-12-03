const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n");

let roadMap = [];


input.forEach(row => {
    roadMap.push(row.split(""));
});

// console.log(roadMap);

let xMax = roadMap[0].length;


function findTrees(r,d){
    let x = 0;
    let trees = 0;
    for(y = 0;y < roadMap.length; y = y+d) {
        if(roadMap[y][x] == '#') trees++;
        x+=r;
        x = x%xMax;
    }

    return trees;
}

let answerOne = findTrees(3,1);
let answerTwo = findTrees(1,1) * findTrees(3,1) * findTrees(5,1) * findTrees(7,1) * findTrees(1,2);

console.log({answerTwo, answerOne});