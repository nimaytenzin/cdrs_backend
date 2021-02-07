export default class Util {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'true';
  }
  setFailure(statusCode,message){
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'false';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  setData(data){
    this.data = data;
  }

  send(res) {
    const result = {
      success: this.type,
      message: this.message,
      data: this.data,
    }

    if (this.data) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      success: this.type,
      message: this.message,
    });
  }
}
