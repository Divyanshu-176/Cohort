/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 

Busy-wait is technique where you repeatedly check the time in a loop until a certain condition is met (in this case, waiting for a certain number of milliseconds to pass).
*/


function sleep(milliseconds) {
    return new Promise((call)=>{
        let t1= Date.now();
        while(Date.now()<t1+milliseconds){
            
        }
        call();
    })
    
}

module.exports = sleep;
