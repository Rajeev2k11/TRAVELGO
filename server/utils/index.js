class ResponseUtil {
  static success(data, message = "Success") {
    return {
      data,
      message,
      success: true,
    };
  }
  static error(message, statusCode = 500) {
    return {
      message,
      statusCode,
      success: false,
    };
  }
}

export { ResponseUtil };
