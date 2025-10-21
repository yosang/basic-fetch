const url = new URL('http://localhost:3000/users');

const options = {
  headers: { "x-api-key": "hello-world" }, // this one will be sent off to the server in the request
  method: "GET",
};

const request = new Request(url, options);

fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => console.log("Fetch complete"));
