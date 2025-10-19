// Promises are wrappers for anything async
// They take a callback function, with two parameters, one that represents a resolution and one that represents a rejection
const p = new Promise((resolve, reject) => {
    const x = 5;
    
    // A promise can only either Reoslve or Reject, not both

    // Resolving the promise
    // resolve(x);
    
    // Rejecting the promise
    reject(x)
})

// then
p.then(response => response + 5) // Here we are working with the promise Resolve
.then(modified => console.log(modified)) // Logging out the previous side effect operation
.catch(err => { // Handling errors on Reject
    console.log('We got a Rejection:', err)
})

// Async / Await
// async function getData() {
//     console.log(await p)
// };
// getData();