const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isLoading: true,
    };
  case 'CURRENCIES':
    return {
      ...state,
      isLoading: false,
      currencies: action.currenciesKeys,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses, exchangeRates: action.currencies }],
    };
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: action.newExpense,
    };
  default:
    return state;
  }
};

export default wallet;
