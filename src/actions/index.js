export const userLogin = ({ email, password }) => ({
  type: 'USER_LOGIN',
  email,
  password,
});

export const wallet = (currencies) => ({
  type: 'DESPESA_TOTAL',
  currencies,
});

export const requestAPI = () => ({ type: 'REQUEST_API' });

const url = 'https://economia.awesomeapi.com.br/json/all';

export const fetchAPI = () => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const currencies = await fetch(url);
    const currenciesResolved = await currencies.json();
    const currenciesKeys = Object.keys(currenciesResolved)
      .filter((moeda) => moeda !== 'USDT');
    dispatch(wallet(currenciesKeys));
  } catch (e) {
    console.error(e);
  }
};
