// Using Promise.resolve()

function checkNumber(num) {
    if(typeof num === 'number') {
        return Promise.resolve('Valid numer is: ' + num)
    } else {
        return Promise.reject('Invalid input, not a number')
    }
}

// testing with .then catch
checkNumber(5)
    .then(res => console.log(res))
    .catch(err => console.log(err))

checkNumber('test')
    .then(res => console.log(res))
    .catch(err => console.log(err))

// testing with try catch
