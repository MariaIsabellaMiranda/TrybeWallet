const INITIAL_STATE = {
  currencies: [],
  expenses: ['0'],
  isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isLoading: true,
    };
  case 'DESPESA_TOTAL':
    return {
      ...state,
      isLoading: false,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
