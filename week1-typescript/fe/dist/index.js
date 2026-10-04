"use strict";
const members = [
    { name: "광수", githubId: "gwangsoo" },
    { name: "지수" },
];
let selectedMember = null;
const foundMember = members.find((member) => member.name === "현우");
console.log(selectedMember); // null
console.log(foundMember); // undefined
