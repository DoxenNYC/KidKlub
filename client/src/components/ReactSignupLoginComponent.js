import PropTypes from 'prop-types';
import React from 'react';

import Login from './Login';
import Signup from './Signup';

// Our only css dependency
// import './normalize.css';

class ReactSignupLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.bubleUpSignup = this.bubleUpSignup.bind(this);
    this.bubleUpLogin = this.bubleUpLogin.bind(this);

    this.state = {
      isLogin: this.props.isLogin,
      isRecoveringPassword: this.props.isRecoveringPassword,
      username: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  updateState(key, value) {
    this.setState({ [key]: value });
  }

  bubleUpSignup() {
    this.props.handleSignup({
      username: this.state.username,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    });
  }

  bubleUpLogin() {
    this.props.handleLogin({
      username: this.state.username,
      password: this.state.password,
    });
  }


  render() {
    const styles = {
      wrapper: {
        border: '1px solid #eee',
        borderRadius: 3,
        backgroundColor: '#FAFAFA',
        margin: 10,
        padding: 20,
        maxWidth: '500px',

        width: 500,
        height: 400,
        perspective: 1000,
      },
      title: {
        textAlign: 'center',
        height: 40,
        lineHeight: '40px',
      },
      flipper: {
        transition: '0.4s',
        transformStyle: 'preserve-3d',
        position: 'relative',
        transform: `rotateY(${!this.state.isLogin || this.state.isRecoveringPassword
          ? '180'
          : '0'}deg)`,
      },
    };
    const showCard = () => {
      if (this.state.isLogin && !this.state.isRecoveringPassword) {
        return (
          <Login
            key="login-form"
            handleShowSignup={this.updateState}
            handleShowRecover={this.updateState}
            styles={this.props.styles.login}
            handleLogin={this.bubleUpLogin}
            handleChange={this.updateState}
            username={this.state.username}
            password={this.state.password}
            usernameCustomLabel={this.props.usernameCustomLabel}
            passwordCustomLabel={this.props.passwordCustomLabel}
            goToSignupCustomLabel={this.props.goToSignupCustomLabel}
            submitLoginCustomLabel={this.props.submitLoginCustomLabel}
          />
        );
      } else if (!this.state.isLogin && !this.state.isRecoveringPassword) {
        return (
          <Signup
            key="signup-form"
            handleShowLogin={this.updateState}
            styles={this.props.styles.signup}
            handleSignup={this.bubleUpSignup}
            handleChange={this.updateState}
            username={this.state.username}
            password={this.state.password}
            passwordConfirmation={this.state.passwordConfirmation}
            usernameCustomLabel={this.props.usernameCustomLabel}
            passwordCustomLabel={this.props.passwordCustomLabel}
            passwordConfirmationCustomLabel={this.props.passwordConfirmationCustomLabel}
            goToLoginCustomLabel={this.props.goToLoginCustomLabel}
            submitSignupCustomLabel={this.props.submitSignupCustomLabel}
          />
        );
      }

    };
    return (
      <section
        id="main-wrapper"
        style={Object.assign(styles.wrapper, this.props.styles.mainWrapper)}
      >
        <h1 style={Object.assign(styles.title, this.props.styles.mainTitle)}>{this.props.title}</h1>
        <div style={Object.assign(styles.flipper, this.props.styles.flipper)}>{showCard()}</div>
      </section>
    );
  }
}

ReactSignupLoginComponent.propTypes = {
  title: PropTypes.string,
  isLogin: PropTypes.bool,
  isRecoveringPassword: PropTypes.bool,
  styles: PropTypes.shape({
    mainWrapper: PropTypes.object,
    mainTitle: PropTypes.object,
    flipper: PropTypes.object,
    signup: PropTypes.shape({
      wrapper: PropTypes.object,
      inputWrapper: PropTypes.object,
      buttonsWrapper: PropTypes.object,
      input: PropTypes.object,
      button: PropTypes.object,
    }),
    login: PropTypes.shape({
      wrapper: PropTypes.object,
      inputWrapper: PropTypes.object,
      buttonsWrapper: PropTypes.object,
      input: PropTypes.object,
      button: PropTypes.object,
    }),

  }),
  handleSignup: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  usernameCustomLabel: PropTypes.string,
  passwordCustomLabel: PropTypes.string,
  passwordConfirmationCustomLabel: PropTypes.string,
  goToSignupCustomLabel: PropTypes.string,
  submitLoginCustomLabel: PropTypes.string,
  goToLoginCustomLabel: PropTypes.string,
  submitSignupCustomLabel: PropTypes.string,
};

ReactSignupLoginComponent.defaultProps = {
  title: 'Company Name',
  isLogin: true,
  isRecoveringPassword: false,
  styles: {},
  usernameCustomLabel: 'Username',
  passwordCustomLabel: 'Password',
  passwordConfirmationCustomLabel: 'Confirm password',
  goToSignupCustomLabel: 'Create Account',
  goToLoginCustomLabel: 'Login',
  submitLoginCustomLabel: 'Signin',
  submitSignupCustomLabel: 'Signup',
};

export default ReactSignupLoginComponent;
