class customApiError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.status = statusCode;
  }
}
module.exports = customApiError;
