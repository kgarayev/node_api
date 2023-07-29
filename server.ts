// importing express framework
import express from "express";

// import middleware functions
import { logging } from "./middleware/logging";

// import simpleAuth from "./middleware/simpleAuth";

// importing the random id generator function
// import { genRandomString } from "./utils/math";

// to temporarily fix an error
import cors from "cors";

// importing routes
// import { router as genericRouter } from "./routes/generic";
import { router as userRouter } from "./routes/user";
import { router as accountRouter } from "./routes/account";
import { router as transactionRouter } from "./routes/transaction";

// creating a new instance of express
const myApp = express();

// Middleware section START

// handle static files
myApp.use(express.static("public"));

myApp.use(cors()); //just fixes it for now!!!

// json body parser middleware to read the body
myApp.use(express.json());

// a logging middleware
myApp.use(logging);

// API KEY validation middleware
// myApp.use(simpleAuth);

// view users route middleware
// myApp.use("/generic", genericRouter);

// view users route middleware
myApp.use("/user", userRouter);

// view accounts route middleware
myApp.use("/account", accountRouter);

// view transactions route middleware
myApp.use("/transaction", transactionRouter);

// Mddleware section FINISH

// ability to choose available port to use
// good practice
const PORT = process.env.PORT || 6001;

// to start the server
myApp.listen(PORT, () => {
  console.log("The server is now running!");
});
