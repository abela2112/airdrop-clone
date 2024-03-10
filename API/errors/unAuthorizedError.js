const customApiError = require("./customApiError");
class unAuthorizedError extends customApiError {
  constructor(msg) {
    super(msg);
    this.status = 401;
  }
}
module.exports = unAuthorizedError;
