import { myPromise } from "./0-promise.js";

// We need to turn this function
// as an asynchronous function in order to be able to use await
// (async function () {
//     const result = await myPromise
//     console.log('Simple async/await: ',result) // This will throw a ERR_UNHANDLES_REJECTION because we are not catching the error
// })();

// Using a try catch allows us to handle a success/erronous scenario
(async function () {
    try {
        const result = await myPromise
        console.log('try/catch:', result)
    } catch (err) {
        // console.log('Error message: ', err.message)
        console.log('Error message: ', err)
    }
})();