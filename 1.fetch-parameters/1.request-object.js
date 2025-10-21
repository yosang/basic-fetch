const url = new URL('http://localhost:3000/users');

const options = {
  headers: { "x-api-key": "hello-world" }, // this one will be sent off to the server in the request
  method: "GET",
};

const request = new Request(url, options);

fetch(request)
  .then((response) => {
    if(!response.ok) throw new Error('Invalid response')
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => console.log("Fetch complete"));
