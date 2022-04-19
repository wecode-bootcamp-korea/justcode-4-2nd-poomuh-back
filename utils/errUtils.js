const errGenerator = async (errParams) => {
  const err = new Error(errParams.message);
  err.statusCode = errParams.statusCode;
  return err;
};

const errHandler = async (err, req, res, next) => {
  const { statusCode, message } = await err;
  console.log(`statusCode : ${statusCode}, message : ${message}`);
  res.status(statusCode || 500).json({
    message: message,
  });
};

module.exports = { errGenerator, errHandler };
