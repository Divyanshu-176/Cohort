## Counter without setInterval
Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let c = 0;

function counter() {
    console.log(c);
    c++;
    setTimeout(counter, 1000); // Call `counter` again after 1 second
}

counter(); // Start the counter
