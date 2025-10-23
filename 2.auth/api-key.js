// An API key can be passed in as querystrings, headers or cookies

const apiURL = 'http://127.0.0.1:3000/lotr?test=yes';
const url = new URL(apiURL); // URL object that can be used in a Request object
const myApiKey = 'youshallnotpass';

function sendQuery() {
    const searchParams = url.searchParams // Extracting the search params from the url as an object, here we can append, delete etc.
    searchParams.append('x-api-key', myApiKey)
    
    fetch(url, {
        method: 'GET'
    })
    .then(res => {
        if(!res.ok) throw new Error('Invalid response')
        return res.json();
    })
    .then(data => console.log(data))
    .catch((err) => console.log(err))
}
// sendQuery();

function sendHeaders() {
    const h = new Headers(); // Creates a Headers object, we can use methods to add to it such as .append("Content-Type", "application/json")
    h.append('x-api-key', myApiKey);
    
    const req = new Request(url, { // Request object, using the url, setting a method, and using our headers object
        method: 'GET',
        headers: h
    });

    fetch(req)
    .then(res => {
        if(!res.ok) throw new Error('Invalid response')
            return res.json()
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
    
    // The one above is verbose, its just one way to do it, to keep the fetch clean, we can also just do this and jam it all together
    // fetch(apiURL, {
    //     method: 'GET',
    //     headers: {
    //         "x-api-key":"youshallnotpass"
    //     }
    // })
    // .then(res => {
    //     if(!res.ok) throw new Error('Invalid response')
    //         return res.json()
    // })
    // .then(data => console.log(data))
    // .catch(err => console.log(err))
};
// sendHeaders()


