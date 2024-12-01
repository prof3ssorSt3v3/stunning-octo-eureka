//using a JS class to create our own custom error

class FetchError extends Error {
  constructor(message, response) {
    super(message);
    this.message = message;
    this.name = 'FetchError';
    this.response = response;
    this.status = response.status;
  }
}

export { FetchError };
