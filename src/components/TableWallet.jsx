import React from 'react';

class TableWallet extends React.Component {
  render() {
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
      </table>
    );
  }
}

export default TableWallet;
