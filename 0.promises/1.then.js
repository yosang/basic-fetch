import { myPromise } from "./0-promise.js";

myPromise
    .then((response) => {
        console.log(response) // Will log the Resolved response as is
    })
    .catch(err => {
        console.error('Error:', err) // Handles a Reject here
    })
    .finally(() => console.log('Promise completed')) // This will be logged regardless of resolve/reject