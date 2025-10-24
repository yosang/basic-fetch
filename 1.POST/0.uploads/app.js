const form = document.getElementById('myForm')
const apiURL = new URL('http://127.0.0.1:3000/upload')

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submittion event

    // Validate inputs
    const jsonFile = document.getElementById('jsonFile').files[0];
    const imageFile = document.getElementById('imageFile').files[0];

    if(!jsonFile || !imageFile) return alert('Please select both a JSON file and a image file')

    const request = new Request(apiURL, { 
        method: 'POST', 
        body: new FormData(form),// Allows us to pack up the files passed to our form in one object
        })

    fetch(request)
        .then(response => {
            if(!response.ok) throw new Error('Invalid response', response.status)
            response.json()
        })
        .then(data => {console.log(data)})
        .catch(err => console.log(err))
})

