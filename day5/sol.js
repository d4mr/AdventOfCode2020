const fs = require("fs");
const { constants } = require("http2");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n");

let largest = 0;

let exists = [];

input.forEach((code) => {
    const row = code.substr(0, 7).split("").reduce((acc, l, i, arr) => l == "B" ? acc + (2 ** (arr.length - (i + 1))) : acc, 0);
    const col = code.substr(7).split("").reduce((acc, l, i, arr) => l == "R" ? acc + (2 ** (arr.length - (i + 1))) : acc, 0);
    const seatNo = (row * 8) + col;

    largest = Math.max(seatNo, largest);
    exists.push(seatNo);
});

let mySeat;

exists.sort().some((v,i,arr)=>{
    if (i==0) return;
    if(v - arr[i-1] > 1) {
        mySeat = v - 1;
        return true;
    }
})

console.log({ largest, mySeat });


// let code = "BBFFBBFRLL";
// const row = code.substr(0, 7).split("").reduce((acc, l, i, arr) => l == "B" ? acc + (2 ** (arr.length - (i + 1))) : acc, 0);
// const col = code.substr(7).split("").reduce((acc, l, i, arr) => l == "R" ? acc + (2 ** (arr.length - (i + 1))) : acc, 0);

// console.log((row * 8) + col, {row,col});