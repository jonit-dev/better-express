export const errorHandlerMiddleware = function (err, req, res, next): any {
  console.log(err.stack);

  console.log("errorHandler activated");
  console.log("statusCode: ");
  console.log(err.statusCode);
  if (err.statusCode) {
    return res.status(err.statusCode).send(err);
  }

  next();
};
