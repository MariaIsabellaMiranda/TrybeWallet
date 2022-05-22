import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { options, select, testid, label, handleChange } = this.props;
    return (
      <label htmlFor={ select }>
        { label }
        <select name={ select } id={ select } data-testid={ testid } onChange={ (e) => handleChange(e) }>
          {options.map((opt) => (
            <option key={ opt }>{ opt }</option>
          ))}
        </select>
      </label>
    );
  }
}

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  select: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
