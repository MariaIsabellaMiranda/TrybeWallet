import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';

class TableWallet extends React.Component {
  deletLine = (id) => {
    const { expenses, updateExpense } = this.props;
    const newExpenses = expenses.filter((exp) => exp.id !== id);
    updateExpense(newExpenses);
  }

  // editForm = (id) => {
  //   const { expenses, expenseEd } = this.props;
  //   const expenseEdt = expenses.find((exp) => exp.id === id);
  //   expenseEd(expenseEdt);
  // }

  render() {
    const { expenses, editForm } = this.props;
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
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => editForm(exp.id) }
                >
                  Editar

                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deletLine(exp.id) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateExpense: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpense: (data) => dispatch(updateExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
