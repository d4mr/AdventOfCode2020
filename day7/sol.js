const fs = require("fs");
const stdinBuffer = fs.readFileSync(0);

const rules = stdinBuffer.toString().split("\n");

function parse(rules) {
    return rules.reduce((acc, rule) => {
        let [type, children] = rule.split(" bags contain ");
        children = children == "no other bags." ? null : children.split(",").map(child => child.trim());
        if (children) {
            children = children.reduce((acc, child) => {
                let [number, type1, type2, _] = child.split(" ");
                let type = [type1, type2].join(" ");
                return { ...acc, [type]: number };
            }, {});
        }
        return { ...acc, [type]: children };
    }, {});
}

function countContainmentPossibilities(query, searchSpace) {
    let result = 0;

    Object.keys(searchSpace).forEach(key => {
        if (isBagContainedInChildren(searchSpace[key])) result++;
    })

    function isBagContainedInChildren(children) {
        if (!children) return false;
        if (Object.keys(children).indexOf(query) !== -1) return true;
        return Object.keys(children).some(key => isBagContainedInChildren(searchSpace[key]));
    }

    return result;
}

function countChildren(query, searchSpace) {
    return numberOfBagsContainedInChildren(searchSpace[query]) - 1;

    function numberOfBagsContainedInChildren(children) {
        if (!children) return 1;
        return Object.keys(children).reduce((acc, current) => {
            return acc + (children[current] * numberOfBagsContainedInChildren(searchSpace[current]));
        }, 1);
    }
}


let bags = parse(rules);
let answerOne = countContainmentPossibilities("shiny gold", bags);
let answerTwo = countChildren("shiny gold", bags);
console.log(bags);
console.log({ answerOne, answerTwo });