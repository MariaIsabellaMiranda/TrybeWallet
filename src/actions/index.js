export const userLogin = ({ email, password }) => ({
  type: 'USER_LOGIN',
  email,
  password,
});

export const getCurrencies = (currenciesKeys) => ({
  type: 'CURRENCIES',
  currenciesKeys,
});

export const saveExpenses = (expenses, currencies) => ({
  type: 'EXPENSES',
  expenses,
  currencies,
});

export const updateExpenses = (newExpense) => ({
  type: 'NEW_EXPENSE',
  newExpense,
});

export const requestAPI = () => ({ type: 'REQUEST_API' });

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchAPI = () => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const currencies = await fetch(URL);
    const currenciesResolved = await currencies.json();
    delete currenciesResolved.USDT; // remove do objeto a chave que eu quiser, no caso .USDT :)
    const currenciesKeys = Object.keys(currenciesResolved);
    dispatch(getCurrencies(currenciesKeys));
  } catch (e) {
    console.error(e);
  }
};

export const fetchApiExpenses = (expenses) => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const currencies = await fetch(URL);
    const currenciesResolved = await currencies.json();
    delete currenciesResolved.USDT; // remove do objeto a chave que eu quiser, no caso .USDT :)
    dispatch(saveExpenses(expenses, currenciesResolved));
  } catch (e) {
    console.error(e);
  }
};
