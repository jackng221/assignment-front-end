/**
* A module to handle fetch response.
* @module utilities/requestHandlers
* @author Jack
*/

/**
* Validate response status
* @param {object} response response from a fetch
*/
export function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Promise((resolve, reject) => {
        return reject(response);
      });
    }
}

/**
* Returns JSON of a fetch response
* @param {object} response response from a fetch
*/
export function json(response) {
    return response.json();  // returns a promise
}