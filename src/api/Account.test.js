import Account from './Account';
import request from './request';

jest.mock('./request', () => ({
  __esModule: true,
  default: (url, options) => {
    return Promise.resolve({
      response: `${url} OK!`,
    });
  },
}));

describe('Account', () => {
  const realmUrl = 'https://realm.url';
  const token = 'VERY_SECRET_TOKEN';

  it('get() makes a request', async () => {
    const account = new Account(realmUrl);
    const ret = await account.get(token);
    console.log(ret);
    expect(ret).toEqual(`https://realm.url/account/ OK!`);
  });
});
