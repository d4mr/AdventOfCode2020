const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const groups = stdinBuffer.toString().split("\n\n");

let groupAnswers = [];

groups.forEach(group => {
    let persons = group.split("\n");

    let answers = persons.reduce((acc, person, index) => {
        if (index === 0) return person.split("");
        return acc.filter(ans => (person.split("").indexOf(ans) !== -1));
    }, [])
    groupAnswers.push(answers);
})

let answerTwo = groupAnswers.reduce((acc, current) => acc + current.length, 0);

console.log({ answerTwo });