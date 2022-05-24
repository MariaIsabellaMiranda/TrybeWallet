import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

class Form extends React.Component {
  render() {
    const {
      value, description, handleChange, currency, handleClick, nameButton,
    } = this.props;
    const methodProps = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ handleChange }
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
            onChange={ handleChange }
          />
        </label>
        <Select
          options={ currency }
          select="currency"
          label="Moeda:"
          testid="currency-input"
          handleChange={ handleChange }
        />
        <Select
          options={ methodProps }
          select="method"
          label="Forma de pagamento:"
          testid="method-input"
          handleChange={ handleChange }
        />
        <Select
          options={ tag }
          select="tag"
          label="Categoria:"
          testid="tag-input"
          handleChange={ handleChange }
        />
        <button
          type="button"
          onClick={ () => handleClick() }
        >
          { nameButton }

        </button>
      </form>
    );
  }
}
Form.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
  nameButton: PropTypes.string.isRequired,
};

export default Form;
