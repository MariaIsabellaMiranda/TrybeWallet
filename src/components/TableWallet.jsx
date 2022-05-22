import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableWallet extends React.Component {
  render() {
    const { expenses } = this.props;
    const tableTh = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            {tableTh.map((value, index) => <th key={ index }>{ value }</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ Number(exp.value).toFixed(2) }</td>
              <td>{ exp.exchangeRates[exp.currency].name }</td>
              <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
              <td>
                { (Number(exp.value)
              * Number(exp.exchangeRates[exp.currency].ask)).toFixed(2) }

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableWallet);
