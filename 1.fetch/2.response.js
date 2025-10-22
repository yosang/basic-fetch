// HTTP REQUEST - HEAD, BODY
// HTTP RESPONSE - HEAD, BODY

const imgStr = "https://picsum.photos/id/237/200/300";
const textStr = "http://localhost:3000/";
const jsonData = "http://localhost:3000/users"

// We start by creating a POJO
const obj = {
  id: 1,
  name: "My cusom response",
};

// Then stringify it to json
const jsonStr = JSON.stringify(obj);

// Create a file holding this object and assign it a type
const file = new File([jsonStr], "mycustom.json", { type: "application/json" });

// Now we can proceed to create the response object
const response = new Response(file, {
  status: 200,
  statusText: "Usually we say Ok here",
  headers: {
    "content-type": "application/json",
    "x-api-key": "my private key",
  },
});

// Log the response
// console.log(response);

// Examples

function fetchData() {
  // Makes a call to a website that returns an image, we store the image in memory as a blob
  // We convert it to an url using the URL object and method createObjectURL
  fetch(imgStr)
    .then((response) => {
      if (!response.ok) throw new Error("Invalid response");
      return response.blob(); // binary large object - images, video, audio, fonts etc

      response.text(); // For text, html, xml files, css, javascript etc
      response.json(); // for json files
    })
    .then((blob) => {
      const blobPath = URL.createObjectURL(blob);
      //   console.log(blob)
      //   console.log(blobPath);

      const img = document.getElementById("pic");
      img.src = blobPath;
    })
    .catch((err) => console.log(err));

  // Makes a call to our express server, which returns a response holding "Content-Type":"text/html"
  fetch(textStr)
    .then((response) => {
      if (!response.ok) throw new Error("Invalid response");
      
      return response.text();
    })
    .then((data) => {
      const hd = document.getElementById('header');
      hd.textContent = data;
    })
    .catch((err) => console.log(err));

    // Makes a call to our server, grabs the json and visualises it on the page
    fetch(jsonData)
      .then(response => response.json())
      .then(data => {

        // Retrieves the ul element
        const users = document.getElementById('users');
        users.innerHTML = data.map((user) => {return `
          <p><strong>${user.name}</strong> works at <strong>${user.company.name}</strong></p>
          `
      }).join('')

        // // Transforming the data we are getting from the API and creating our own object
        // data.forEach(user => {
        //   arrayOfUsers.push({
        //     name: user.name,
        //     company: user.company.name
        //   })
        // })  
      
        // // Creates a list element for every user in the array and appends it to the user element
        // arrayOfUsers.forEach(user => {
        //   const listElement = document.createElement('li')
        //   listElement.innerHTML = `<strong>${user.name}</strong>, works at: <strong>${user.company}</strong>`
        //   users.append(listElement)
        // })
        
      })
      .catch(err => console.log(err))
}
