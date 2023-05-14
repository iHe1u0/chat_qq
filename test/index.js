require("dotenv").config();

const is_private_on = process.env.private ? (process.env.private === 'true' ? true : false) : true;
const is_group_on = process.env.private ? (process.env.private === 'true' ? true : false) : false;

console.log(is_group_on);
console.log(typeof (is_group_on));

if (is_group_on) {
    console.log('on');
} else {
    console.log('off');
}