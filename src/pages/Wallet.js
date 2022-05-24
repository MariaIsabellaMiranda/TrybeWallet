import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAPI,
  fetchApiExpenses,
  actionEditExpense,
  updateExpenses,
} from '../actions';
import Form from '../components/Form';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { getExpenses } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expensesState = { id, value, description, currency, method, tag };
    getExpenses(expensesState);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '0',
      description: '',
      currency,
    }));
  }

  updateExpenses = () => {
    const { expenses } = this.props;
    let despesaTotal = 0;
    expenses.forEach((exp) => {
      despesaTotal += Number(exp.value)
      * Number(exp.exchangeRates[exp.currency].ask); // preciso colocar o currency entre [] para funcionar com 'dot notation '
    });
    return despesaTotal.toFixed(2);
  };

  editForm = (id) => {
    const { expenses, expenseEd } = this.props;
    const expenseEdt = expenses.find((exp) => exp.id === id);
    expenseEd(expenseEdt);
    this.setState({
      value: expenseEdt.value,
      description: expenseEdt.description,
      currency: expenseEdt.currency,
      method: expenseEdt.method,
      tag: expenseEdt.tag,
    });
  }

  editNewExpense = () => {
    const { updateExpensesEdit, expenses, expenseEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const updateStateEdit = { value, description, currency, method, tag };
    const expenseEstate = { ...expenseEdit, ...updateStateEdit };
    const newExpenseEdit = expenses.map((exp) => {
      if (exp.id === expenseEstate.id) {
        return expenseEstate;
      }
      return exp;
    });
    updateExpensesEdit(newExpenseEdit);
  }

  render() {
    const { email, expenses, currencies, edit } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
          >
            { `Email: ${email}` }

          </span>
          <div>
            <span>Despesa Total: R$</span>
            <span
              data-testid="total-field"
            >
              {!expenses ? 0 : this.updateExpenses()}

            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        { edit ? (
          <Form
            value={ value }
            description={ description }
            handleChange={ this.handleChange }
            currency={ currencies }
            handleClick={ this.editNewExpense }
            nameButton="Editar despesa"
          />)
          : (
            <Form
              value={ value }
              description={ description }
              handleChange={ this.handleChange }
              currency={ currencies }
              handleClick={ this.handleClick }
              nameButton="Adicionar Despesa"
            />
          )}
        <TableWallet editForm={ this.editForm } />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  getExpenses: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  expenseEd: PropTypes.func.isRequired,
  expenseEdit: PropTypes.objectOf(PropTypes.any).isRequired,
  updateExpensesEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  expenseEdit: state.wallet.expensesEdit,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (data) => dispatch(fetchAPI(data)),
  getExpenses: (expense) => dispatch(fetchApiExpenses(expense)),
  expenseEd: (data) => dispatch(actionEditExpense(data)),
  updateExpensesEdit: (data) => dispatch(updateExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
