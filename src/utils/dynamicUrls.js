const {
  REACT_APP_API_URL_DEPOYED,
  REACT_APP_API_URL_LOCAL,
  REACT_APP_URL_DEPOYED,
  REACT_APP_URL_LOCAL
} = process.env;

const serverApiUrl =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? REACT_APP_API_URL_DEPOYED
    : REACT_APP_API_URL_LOCAL;

const serverReactAppUrl =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? `${REACT_APP_URL_DEPOYED}`
    : `${REACT_APP_URL_LOCAL}`;

export { serverApiUrl, serverReactAppUrl };
