let message = 'Hello world' //these can be reassigned
console.log(message)

const firstName = 'Pavan' //const values can't be reassigned
console.log(firstName)

let fname = 'Sai Pavan'
let age = 30;
let isApproved = true;
let lname = undefined;
let selectedColor = null;

let person = {name: 'Pavan', age:30};

console.log(person.name);
console.log(person.age);

let arr = ['Sai', 'Pavan']
arr[2] = 'Kumar'
console.log(arr)

function greet(name) {
    console.log('Hello '+name)
}

greet('Pavan');