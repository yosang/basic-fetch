import apiURL from "./url.js"

fetch(apiURL) // returns a promise - a promise is basically just a wrapper around the response object we get back
.then((res) => { // Once the promise has been unwrapped, the first then will hold the response object, here we are just logging it
    // console.log(res)  

    // Error handling on the response
    if(!res.ok) throw new Error('Invalid response')

    // If no errors occur, parse the response json string to a javascript object using the method .json()(this method is also returns a promise so we need to resolve it with a .then)
    return res.json()
})
.then(data => console.log(data)) // We get back a javascript object
.catch((err) => { // In case of errors during the fetch, the catch will receive an error object
    if(err) console.log(err.message) // Here we are logging the message of the error object ot the console
})


// We can store a promise as well, and eithe resolve it with a .then or an await (needs an async func)
const result = fetch(url).then(res => res.json()).catch(err => console.log(err.message));
result.then(data => console.log(data))