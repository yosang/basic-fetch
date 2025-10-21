// HTTP REQUEST - HEAD, BODY
// HTTP RESPONSE - HEAD, BODY

const imgStr = "https://picsum.photos/id/237/200/300";

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

// Example
function replaceImage() {
  fetch(imgStr)
    .then((response) => {
      if (!response.ok) throw new Error("Invalid response");
      return response.blob();
    })
    .then((blob) => {
      const blobPath = URL.createObjectURL(blob);
    //   console.log(blob)
    //   console.log(blobPath);

      const img = document.getElementById('pic');
      img.src = blobPath
    })
    .catch((err) => console.log(err));
}
