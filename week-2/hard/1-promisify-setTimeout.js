/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((func)=>{setTimeout(func,n*1000)});
}

function hello(){
    console.log('hello');
}

wait(3000).then(hello);

module.exports = wait;
