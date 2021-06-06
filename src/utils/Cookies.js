import Cookies from 'js-cookie';

const EXPRIES = 1 / 24;

export const removeCookies = () => {
  Cookies.remove('hcmaid', { path: '/' });
  Cookies.remove('name', { path: '/' });
  Cookies.remove('role', { path: '/' });
};

export const setCookies = (token, name, role) => {
  Cookies.set('hcmaid', token, { expires: EXPRIES });
  Cookies.set('name', name, { expires: EXPRIES });
  Cookies.set('role', role, { expires: EXPRIES });
};
