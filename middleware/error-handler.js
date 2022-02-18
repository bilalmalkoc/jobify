import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleWare = (err, req, res, next) => {
  console.log(err);

  const defaultErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later !',
  };

  if (err.name === 'ValidationError') {
    defaultErr.statusCode = StatusCodes.BAD_REQUEST;
    // defaultErr.msg = err.message;
    defaultErr.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  if (err.code && err.code === 11000) {
    defaultErr.statusCode = StatusCodes.BAD_REQUEST;
    defaultErr.msg = `${Object.values(err.keyValue)} is in already use.`;
  }

  // res.status(defaultErr.statusCode).json({ msg: err });
  res.status(defaultErr.statusCode).json({ msg: defaultErr.msg });
};

export default errorHandlerMiddleWare;
