import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, fetchApiExpenses } from '../actions';
import Select from '../components/Select';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
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
      value: 0,
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

  render() {
    const { email, expenses, currencies } = this.props;
    const { value, description } = this.state;
    const methodProps = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
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
        <div>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <Select
            options={ currencies }
            select="currency"
            label="Moeda:"
            testid="currencies"
            handleChange={ this.handleChange }
          />
          <Select
            options={ methodProps }
            select="method"
            label="Forma de pagamento:"
            testid="method-input"
            handleChange={ this.handleChange }
          />
          <Select
            options={ tag }
            select="tag"
            label="Categoria:"
            testid="tag-input"
            handleChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ () => this.handleClick() }
          >
            Adicionar Despesa

          </button>
        </div>
        <TableWallet />
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (data) => dispatch(fetchAPI(data)),
  getExpenses: (expense) => dispatch(fetchApiExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
