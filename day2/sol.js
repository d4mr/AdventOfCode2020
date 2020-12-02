const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n");

let answerOne = 0;

input.forEach(line=>{
    let [lengthLimits, letterToFindPlusColon, password] = line.split(" ");
    let [lengthMin, lengthMax] = lengthLimits.split("-");
    let letterToFind = letterToFindPlusColon.replace(":","");
    let lengthOfAppearance = (password.split(letterToFind).length - 1);
    if(lengthOfAppearance >= lengthMin && lengthOfAppearance <= lengthMax) answerOne++;
})

let answerTwo = 0;

input.forEach(line=>{
    let [checkLocations, letterToFindPlusColon, password] = line.split(" ");
    let [checkLocationOne, checkLocationTwo] = checkLocations.split("-");
    let letterToFind = letterToFindPlusColon.replace(":","");

    let matches = 0;

    if(password[checkLocationOne-1] == letterToFind) matches++;
    if(password[checkLocationTwo-1] == letterToFind) matches++;

    if(matches==1) answerTwo++;
})

console.log({answerOne, answerTwo});