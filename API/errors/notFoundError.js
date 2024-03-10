const customApiError = require("./customApiError");

class notFoundError extends customApiError {
  constructor(msg) {
    super(msg);
    this.status = 404;
  }
}
module.exports = notFoundError;
