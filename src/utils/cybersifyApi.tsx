export const apiLink = process.env.NEXT_PUBLIC_LIVE_API_URL;
export const fakeURL = process.env.NEXT_FAKE_API_URL;

export const Auth={
  register:`${apiLink}user/register`,
  login:`${apiLink}auth/login`,
  logout:`${apiLink}auth/logout`,
}
export const header = {
  list: `${apiLink}header`,
};
export const user = {
  listing:`${apiLink}user/profile`,
  add: `${apiLink}favourite`,
};

export const banner = {
  list: `${apiLink}banner`,
};

export const card = {
  listing: `${apiLink}cards-type`,
  getName: `${apiLink}card-names`,
};

export const review = {
  list: `${apiLink}verified-review`,
};

export const joinCompany = {
  listing: `${apiLink}join-company`,
};

export const colldectionCard={
  listing :`${apiLink}card/card-listing`
}
