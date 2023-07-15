// define the API KEY
const apiKey = "abcd1234";

const simpleAuth = (req: ExpressRequest, res: ExpressResponse, next: Next) => {
  console.log(apiKey);

  console.log(req.headers.api_key);

  console.log(apiKey === req.headers.api_key);

  // defensive check to see if the API KEY entered matches the one in the system
  if (req.headers.api_key === apiKey) {
    console.log("matching");

    // proceed if matches
    next();
  }
  // do not allow to proceed but respond
  res.send("Sorry, bad API key");
};

module.exports = simpleAuth;
