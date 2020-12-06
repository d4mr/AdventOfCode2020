const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const groups = stdinBuffer.toString().split("\n\n");

let groupAnswers = [];

groups.forEach(group=>{
    let answers = {};
    group.split("\n").forEach((person, index) =>{

        person.split("").forEach(answer=>{
            if(!answers[answer]) answers[answer] = true;
        })
    })
    groupAnswers.push(Object.keys(answers));
})

let answerOne = groupAnswers.reduce((acc, current) => acc+current.length, 0);

console.log({answerOne});