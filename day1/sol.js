const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n");

let answerOne = null;

input.some((n, i) => {
    input.slice(i + 1).some(o => {
        if (Number(n) + Number(o) == 2020) {
            answerOne = Number(n) * Number(o);
            return true;
        }
    })

    if (answerOne) return true;
})

let answerTwo = null;

input.some((n, i) => {
    input.slice(i + 1).some((o, j) => {
        input.slice(j + 1).some(p => {

            if (Number(n) + Number(o) + Number(p) == 2020) {
                answerTwo = Number(n) * Number(o) * Number(p);
                return true;
            }
        })
        if (answerTwo) return true;
    });

    if (answerTwo) return true;
})

console.log({answerOne, answerTwo});