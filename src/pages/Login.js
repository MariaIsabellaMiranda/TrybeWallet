import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };

    checkEmail = (email) => {
      const regexValidate = /\S+@\S+\.\S+/;
      return regexValidate.test(email);
    };

    disableButton = () => {
      const { password, email } = this.state;
      const NUMBER_MAX_PASSWORD = 6;
      const validEmail = this.checkEmail(email);
      if (password.length >= NUMBER_MAX_PASSWORD && validEmail) {
        return false;
      }
      return true;
    }

    render() {
      const { getLogin, history } = this.props;
      const { email, password } = this.state;
      const userData = { email, password };
      return (
        <div>
          <label htmlFor="name">
            Email
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <label htmlFor="name">
            Senha
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
          <button
            type="button"
            disabled={ this.disableButton() }
            onClick={ () => {
              getLogin(userData);
              history.push('/carteira');
            } }
          >
            Entrar

          </button>
        </div>
      );
    }
}

Login.propTypes = {
  getLogin: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getLogin: (data) => dispatch(userLogin(data)),
});

export default connect(null, mapDispatchToProps)(Login);
