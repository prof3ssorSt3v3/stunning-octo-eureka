//using a JS class to create our own custom error
// new Error() => has prototype Error.prototype
// new FetchError() => has FetchError.prototype
// FetchError.prototype.__proto__ == Error.prototype

class FetchError extends Error {
  constructor(message, response, url) {
    super(message);
    //this is like calling new Error(message)
    //because we use extends Error
    //we are supposed to call super();
    //now Error.prototype.message = message

    //this.message = message;
    this.name = 'FetchError';
    this.response = response;
    this.status = response.status;
    this.request = new Request(url);
  }
}

class BeerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BeerError';
    this.hasBeer = false;
    this.wantsBeer = true;
  }
  openBeer() {
    //open the beer
    //inside BeerError.prototype
  }
}
class CoronaError extends BeerError {
  constructor() {
    super('The beer was Corona');
    this.name = 'CoronaError';
    this.wasCorona = true;
  }
  //errors of this type automatically can access
  // BeerError.prototype.openBeer();
  // let corona = new CoronaError('hello');
  // corona.openBeer();
}

class SearchError extends Error {
  constructor(message, input) {
    super(message);
    this.name = 'SearchError';
    this.input = input;
    input.classList.add('error');
  }
}

export { FetchError, BeerError, SearchError };

// function Error(message){}

// function SearchError(message, input){
//   Error(message);
// }

// function KeywordError(keyword, message, input){
//   SearchError(message, input);
// }
