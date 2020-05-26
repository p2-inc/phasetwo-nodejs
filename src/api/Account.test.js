import Account from './Account';
import request from './request';

// Note: 'mock' prefix is necessary for these to be usable inside jest.mock()
const mockRealmUrl = 'https://realm.url';
const mockAccountUrl = `${mockRealmUrl}/account/`;
const mockResponse = {
  username: 'alice',
  firstName: 'Alice',
  lastName: 'Liddel',
  email: 'alice@keycloak.org',
  emailVerified: false,
  attributes: {},
};

// TODO: move this mock to its own module
jest.mock('./request', () => ({
  __esModule: true,
  default: jest.fn((url, options) => {
    if (url === mockAccountUrl) {
      return Promise.resolve({
        success: true,
        status: 200,
        response: mockResponse,
      });
    }

    return Promise.reject({
      success: false,
      status: 400,
      response: `Error!`,
    });
  }),
}));

describe('Account', () => {
  const token = 'VERY_SECRET_TOKEN';
  const expectedHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${token}`,
  };

  it('get() makes properly formed request', async () => {
    expect.assertions(2);
    const account = new Account(mockRealmUrl);

    const ret = await account.get(token);
    expect(request).toHaveBeenCalledWith(mockAccountUrl, { headers: expectedHeaders });

    expect(ret).toEqual(mockResponse);
  });

  it('get() catches server errors', async () => {
    // mockImplementation() prevents logging to the console during the test
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    expect.assertions(2);
    const account = new Account('https://wrong.url');

    const ret = await account.get(token);
    expect(errorSpy).toHaveBeenCalled();
    expect(ret).toEqual('Error!');
    errorSpy.mockRestore();
  });
});
