const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  edit: false,
  expensesEdit: {},
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
      edit: false,
    };
  case 'EXPENSE_EDIT':
    return {
      ...state,
      expensesEdit: action.editExpense,
      edit: true,
    };
  default:
    return state;
  }
};

export default wallet;
