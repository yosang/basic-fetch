import apiURL from "../url.js"

const url = apiURL

// We can use async and await instead of then()
// However, we need to manually provide error handling with a try...cach

// So the upside I guess is that then methods provide 
    // the possibility to handle errors directory with the .ca tch method

// It comes down to a design choice, one is more verbose than the other

// async - await
async function fetchData() {
    const response = await fetch(url);
    if(!response.ok) throw new Error('Invalid response'); // Assuming who evers calls this function, must setup a try catch, for this one to be caught
    
    const data = await response.json()
    console.log(data);
}
// fetchData();


// Try catch
async function fetchDataTryCatch() {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('Invalid response'); // This one will be caught in the catch downstairs.

        const data = await response.json()
        console.log(data)
    } catch(err) {
        console.log(err.message)
    }
}
fetchDataTryCatch();