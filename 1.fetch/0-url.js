import apiURL from '../url.js'

const url = new URL(apiURL); // This is now an URL object

// console.log(url.protocol) // https:
// console.log(url.host) // jsonplaceholder.typicode.com
// console.log(url.pathname) // /users

// Practical example
// Consider we receive query parameters in a post, and we need to fetch our api, with those filters

function filteredFetch(filters) {
    const url = new URL(apiURL);

    // Log the filters variable to see what it looks like
    console.log(Object.entries(filters)) // [ [ 'id', 1 ], [ 'name', 'Yosmel' ], [ 'age', 33 ] ]
    
    // We want to dynamically add the filters to the url object passed to this function
    Object.entries(filters).forEach(([key, value]) => {
        url.searchParams.append(key, value) // Will start appending key, value paris in a query format id=1&name=Yosmel etc...
    })

    // Console log the url object as a string
    console.log(url.toString())

    // Apply the fetch functionality here
}

filteredFetch({ id: 1, name:'Yosmel', age:33}) // https://jsonplaceholder.typicode.com/users?id=1&name=Yosmel&age=33

// Additionally, searchParams also provide these methods: .set(), or .delete()
// The URL object allows us to work with the URL string in a structured matter
// So we dont have to manually manipulate and cocatenate strings