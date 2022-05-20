import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { email, expenses, currencies } = this.props;
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
            <span data-testid="total-field">{ expenses }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <div>
          <label htmlFor="valor">
            Valor:
            <input data-testid="value-input" id="valor" type="number" />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input data-testid="description-input" id="descrição" type="text" />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select id="moeda">
              { currencies.map((moeda, index) => (
                <option key={ index }>{ moeda }</option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Forma de pagamento:
            <select id="pagamento" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select id="categoria" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (data) => dispatch(fetchAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
