const notFound = (req, res) => {
  return res.status(404).json({ error: `${req.url} not found` })
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error',
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message })
}

module.exports = { notFound, errorHandler }
