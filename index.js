// index.js
// console.log('Hello World!');
const axios = require("axios");

// Axios GET Default
axios
  .get("https://finalspaceapi.com/api/v0/character/?limit=2")
  .then(function (response) {
    console.log(response);
  });

// Using the Request Config
axios({
  method: "get",
  url: "https://finalspaceapi.com/api/v0/character/?limit=2",
}).then(function (response) {
  console.log(response.data);
});

// Using the Request Config
axios
  .get("https://finalspaceapi.com/api/v0/character/?limit=2", {
    responseType: "json",
  })
  .then(function (response) {
    console.log(response.data);
  });

// Axios with responseType - stream
GET request for remote image in node.js
const fs = require('fs');
axios({
    method: 'get',
    url: 'https://images.unsplash.com/photo-1642291555390-6a149527b1fa',
    responseType: 'stream'
  })
    .then(function (response) {
        // console.log(response.data.pipe);
      response.data.pipe(fs.createWriteStream('nature.jpg'))
    });

// Using Asyc/Await
async function getCharacters() {
  const response = await axios.get(
    "https://finalspaceapi.com/api/v0/character/?limit=2"
  );
  console.log(response.data);
}
getCharacters();

// Using Asyc/Await and Destructuring
async function getCharacters() {
  const { data } = await axios.get(
    "https://finalspaceapi.com/api/v0/character/?limit=2"
  );
  console.log(data);
}
getCharacters();

// Using with API Key
require("dotenv").config();
axios
  .get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  )
  .then((response) => {
    console.log(response.data);
  });

// With API Key and params option
require("dotenv").config();
axios({
  method: "get",
  url: `https://api.nasa.gov/planetary/apod`,
  params: {
    api_key: process.env.NASA_API_KEY,
  },
}).then((response) => {
  console.log(response.data);
});


// Axios.all()
const endpoints = [
  "https://rickandmortyapi.com/api/character",
  "https://www.breakingbadapi.com/api/characters",
  "https://www.breakingbadapi.com/api/episodes",
  "https://www.breakingbadapi.com/api/quotes",
];
axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((allResponses) => {
    allResponses.forEach((response) => {
    console.log(response.data);
  });
});

// Error Handling
axios
  .get("https://rickandmortyapi.com/api/character/-1")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

// Error Handling - Error Specific
axios
  .get("https://rickandmortyapi.com/api/character/-1")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error("Error", error.message);
    }
  });

// Error Handling with validateStatus option
axios
  .get("https://rickandmortyapi.com/api/character/-1", {
    validateStatus: function (status) {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    },
  })
  .then((response) => {
    console.log(response.data);
  });

// Interceptors
Request Interceptor
axios.interceptors.request.use(
  function (config) {
    console.log(
      `Request Interceptor - A ${config.method} request has been made!`
    );
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Response Interceptor - A response has been received!");
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("Response Interceptor - An error occured!");
    return Promise.reject(error);
  }
);

axios.get("https://rickandmortyapi.com/api/character/1").then((response) => {
  console.log(response.data);
});
