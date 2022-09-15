class CustomAPIError extends Error {
  constructor(StatusCode, msg) {
    super(msg);
    this.msg = msg;
    this.StatusCode = StatusCode;
  }
}

module.exports = CustomAPIError;
