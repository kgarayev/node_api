const simpleLogging = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: Next
) => {
  // show the date and the path
  console.log(new Date(), req.path);

  // allow the request to proceed
  next();
};

module.exports = simpleLogging;
