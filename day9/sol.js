const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n");

let slidingWindowStart = 0;
let slidingWindowEnd = 24;

let answerOne;
let answerTwo;

while (true) {
    let sumPairExists = input.slice(slidingWindowStart, slidingWindowEnd).some((n, i) => {
        return input.slice(i + 1).some(o => {
            if (Number(n) + Number(o) == input[slidingWindowEnd + 1]) {
                return true;
            }
        });
    });

    if (!sumPairExists) {
        answerOne = input[slidingWindowEnd + 1];
        break;
    } else {
        slidingWindowEnd++;
        slidingWindowStart++;
    }
}


let slidingWindow2Start = 0;
let slidingWindow2End = 1;

while (true) {
    let sum = input.slice(slidingWindow2Start, slidingWindow2End).reduce((acc, i) => Number(i) + acc, 0);

    if (sum < answerOne) {
        slidingWindow2End++;
    }
    else if (sum > answerOne) {
        slidingWindow2Start++;
        slidingWindow2End = slidingWindow2Start + 1;
    } else if (sum == answerOne) {
        answerTwo = Math.max(...input.slice(slidingWindow2Start, slidingWindow2End)) + Math.min(...input.slice(slidingWindow2Start, slidingWindow2End));
        break;
    }
}


console.log({ answerOne, answerTwo });