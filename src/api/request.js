import fetch from 'node-fetch';

/*
 * A modified version of fetch() which throws an error on non-200 status codes.
 *
 * The default implementation of fetch() only throws when a network error is encountered,
 * leading to the development of shims like this one to allow API consumers to handle
 * API errors via .catch()
 *
 * @return {Promise} A promise resolving to:
 *    {
 *      success: true, // or false
 *      status: 200, // or 400, 401, etc
 *      statusText: "",
 *      response: {
 *        // original response from server
 *      }
 *    }
 */
function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(handleResponse)
      .then((response) => JSON.parse(response))
      .then((json) => resolve(json))
      .catch((error) => {
        try {
          reject(JSON.parse(error));
        } catch (e) {
          reject(error);
        }
      });
  });
}

function handleResponse(response) {
  return response.json().then((json) => {
    // Modify response to include status ok, success, and status text
    const modifiedJson = {
      success: response.ok,
      status: response.status,
      statusText: response.statusText ? response.statusText : json.error || '',
      response: json,
    };

    // If request failed, reject and return modified json string as error
    if (!modifiedJson.success) return Promise.reject(JSON.stringify(modifiedJson));

    // If successful, continue by returning modified json string
    return JSON.stringify(modifiedJson);
  });
}

export default request;
