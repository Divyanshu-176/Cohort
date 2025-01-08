/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve)=>{setTimeout(resolve,t*1000)});

}

function wait2(t) {
    return new Promise((resolve)=>{setTimeout(resolve,t*1000)});

}

function wait3(t) {
    return new Promise((resolve)=>{setTimeout(resolve,t*1000)});

}

async function calculateTime4(t1, t2, t3) {
    let startTime=Date.now();

    await wait1(t1);
    await wait2(t2);
    await wait3(t3);

    const totalTime=Date.now()-startTime;
    return totalTime;
}

async function calculateTime3(t1, t2, t3) {
    let initT=Date.now();

    await Promise.all([wait1(t1), wait2(t2), wait3(t3)]);
    
    const time= Date.now()-initT;
    return time;
}

(async () => {
    console.log(`It takes for promise chain ${await calculateTime4(1,2,3)} ms`);
    console.log(`It takes for promise all ${await calculateTime3(1,2,3)} ms`);
})

();



// module.exports = calculateTime;
