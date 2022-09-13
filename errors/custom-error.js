class CustomAPIError extends Error {
  constructor(StatusCode, msg) {
    super(msg);
    this.msg = msg;
    this.msg;
  }
}

module.exports = CustomAPIError;
