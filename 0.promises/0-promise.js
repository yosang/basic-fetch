const myPromise = new Promise((resolve, reject) => {
    // setTImout simulates an asynchronous operation (it takes time to get data back from a fetch)
    setTimeout(() => {
        const success = false;
        if(success) {
            resolve('Fetch successful')
        } else {
            // reject(new Error('Fetch failed')) // Using the Error object, allows us to use err.message in a catch block
            reject('Fetch failed')
        }
    }, 1000) // This fetch will take exactly 1 second
})

export { myPromise } 