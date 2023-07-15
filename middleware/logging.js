// define logging function for middleware
logging = (req, res, next) => {
  // show the date and the path
  console.log(new Date(), req.path);

  // allow the request to proceed
  next();
};

module.exports = logging;
