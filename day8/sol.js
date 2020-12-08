const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

let instructions = stdinBuffer.toString().split("\n");

instructions = instructions.map(line => {
    let [op, value] = line.split(" ");
    value = Number(value);
    if (isNaN(value)) throw new Error("Value was not a number");
    if (op !== "nop" && op !== "acc" && op !== "jmp") throw new Error(`Did not recognise operation ${op}`);
    return { operation: op, value };
})

let executed = {};
let accumulator = 0;
let register = 0;
let answerOne;

while (true) {
    let { operation, value } = instructions[register];

    if (executed[register]) {
        answerOne = accumulator;
        break;
    }

    if (operation === 'nop') {
        executed[register] = 1;
        register++;
        continue;
    } else if (operation === 'jmp') {
        executed[register] = 1;
        register += value;
        continue;
    } else if (operation === 'acc') {
        executed[register] = 1;
        register++;
        accumulator += value;
        continue;
    }
}

let answerTwo;

outerLoop:
for (let changedInstruction = 0; changedInstruction < instructions.length; changedInstruction++) {

    if (instructions[changedInstruction].operation === "jmp") {
        instructions[changedInstruction].operation = "nop";
    }
    else if (instructions[changedInstruction].operation === "nop") {
        instructions[changedInstruction].operation = "jmp";
    } else {
        continue outerLoop;
    }

    let register = 0;
    let accumulator = 0;
    let executed = {};

    innerLoop:
    while (true) {
        if (register === instructions.length) {
            answerTwo = accumulator;
            // console.log({ changedInstruction, register });
            break outerLoop;
        }

        if (register < 0 || executed[register] || register > instructions.length) {
            if (instructions[changedInstruction].operation === "jmp") {
                instructions[changedInstruction].operation = "nop";
            }
            else {
                instructions[changedInstruction].operation = "jmp";
            }
            break innerLoop;
            // throw new Error(`Still didn't terminate, repeated at ${register}, lastRegister ${lastRegister}`);
        }

        let { operation, value } = instructions[register];
        // console.log({ changedInstruction, length: instructions.length, register, executed, accumulator, operation, value });

        if (operation === 'nop') {
            executed[register] = 1;
            register++;
            continue innerLoop;
        } else if (operation === 'jmp') {
            executed[register] = 1;
            register += value;
            continue innerLoop;
        } else if (operation === 'acc') {
            executed[register] = 1;
            register++;
            accumulator += value;
            continue innerLoop;
        }
    }
}

console.log({ answerOne, answerTwo });