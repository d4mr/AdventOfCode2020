/*/
/* This ended up very cluttered, I am not particularly proud of this one.
/*/

const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const input = stdinBuffer.toString().split("\n\n");

const passportsRaw = input.map(line => line.split(" ").join("\n").split("\n"));

const passports = passportsRaw.map(passport => {
    let output = {};
    passport.forEach(attribute => {
        let temp = attribute.split(":");
        output[temp[0]] = temp[1];
    })

    return output;
})

let answerOne = null;

let answerTwo = 0;

let rejectees = []

let reasons = {
    byr:0 , iyr:0, eyr:0 ,hgt:0, hcl:0, ecl:0, pid:0
}
passports.forEach(passport => {

    if (!byrCheck(passport)) { rejectees.push(passport); reasons.byr++}
    if (!iyrCheck(passport)) { rejectees.push(passport); reasons.iyr++}
    if (!eyrCheck(passport)) { rejectees.push(passport); reasons.eyr++}
    if (!hgtCheck(passport)) { rejectees.push(passport); reasons.hgt++}
    if (!hclCheck(passport)) { rejectees.push(passport); reasons.hcl++}
    if (!eclCheck(passport)) { rejectees.push(passport); reasons.ecl++}
    if (!pidCheck(passport)) { rejectees.push(passport); reasons.pid++}


    if (byrCheck(passport) && iyrCheck(passport) && eyrCheck(passport) && hgtCheck(passport) && hclCheck(passport) && eclCheck(passport) && pidCheck(passport)) answerTwo++
})

function byrCheck({ byr }) {
    if (typeof byr == 'undefined') return false;
    return (byr.length == 4 && Number(byr) >= 1920 && Number(byr) <= 2002); //return true
    // else console.log(byr);
}

function iyrCheck({ iyr }) {
    if (typeof iyr == 'undefined') return false;
    return (iyr.length == 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020);
}

function eyrCheck({ eyr }) {
    if (typeof eyr == 'undefined') return false;
    return (eyr.length == 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030);
}

function hgtCheck({ hgt }) {
    if (typeof hgt == 'undefined') return false;
    let match = hgt.match()
    if (hgt.substr(hgt.length - 2) == "cm") {
        return (Number(hgt.replace("cm","")) >= 150 && Number(hgt.replace("cm","")) <= 193);
    } else if (hgt.substr(hgt.length - 2) == "in") {
        return (Number(hgt.replace("in","")) >= 59 && Number(hgt.replace("in","")) <= 76);
    } else {
        return false;
    }

}

function hclCheck({ hcl }) {
    if (typeof hcl == 'undefined') return false;
    return hcl.match(/^\#[0-9a-f]{6}$/);
}

function eclCheck({ ecl }) {
    if (typeof ecl == 'undefined') return false;
    return ecl.match(/^amb|blu|brn|gry|grn|hzl|oth$/);
}

function pidCheck({ pid }) {
    if (typeof pid == 'undefined') return false;
    return pid.match(/^\d{9}$/);
}

// let answerTwo = null;
console.log({ answerTwo, answerOne, l: passports.length,rl: rejectees.length, reasons});