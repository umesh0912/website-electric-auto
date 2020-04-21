import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import './auth.scss';
import Button from './../common/Button/Button';
import Modal from '../common/modal/Modal';
import TextInput from '../common/TextInput/TextInput';
import MobileInput from '../common/MobileInput/MobileInput';
import PasswordInput from '../common/Password/PasswordInput';
import { signinUser } from './../../actions/index';
const facebooklogo = require('./../../assets/img/facebook.svg');
const googlelogo = require('./../../assets/img/gplus.svg');

interface IProps {
  isMobileDevice?: boolean;
  onClose: () => void;
  signinUser: ({ email, password }) => any;
}

interface IState {
  showLogin?: boolean;
  showSignUp?: boolean;
  showForgotPassword?: boolean;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string | number;
}

const modalHeaders = {
  'forgot-password': 'Forgot Password',
  'login-wrapper': 'Login',
  'signup-wrapper': 'SignUp'
};

const EMAIL_VALIDATIONS = [
  { name: 'required', message: 'Please enter your email.' },
  {
    name: 'email',
    message: 'Oh. Looks like that email is not valid. Check again?'
  }
];

const MOBILE_VALIDATIONS = [
  { name: 'required', message: 'Please enter a mobile number.' },
  {
    name: 'integer',
    message: 'Please enter a valid phone number'
  },
  {
    name: 'mobile',
    message: 'Please enter a valid phone number'
  }
];

const PASSWORD_VALIDATIONS = [
  { name: 'required', message: 'Please enter your Password.' }
];

const FIRSTNAME_VALIDATIONS = [
  { name: 'required', message: 'Please enter First Name.' }
];

const LASTNAME_VALIDATIONS = [
  { name: 'required', message: 'Please enter Last Name.' }
];

class Auth extends React.Component<IProps, IState> {
  private emailInput: React.RefObject<TextInput>;
  private passwordInput: React.RefObject<PasswordInput>;
  private firstnameInput: React.RefObject<TextInput>;
  private lastnameInput: React.RefObject<TextInput>;
  private mobileInput: React.RefObject<MobileInput>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showForgotPassword: false,
      showLogin: true,
      showSignUp: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      mobile: ''
    };
    this.emailInput = React.createRef<TextInput>();
    this.passwordInput = React.createRef<PasswordInput>();
    this.firstnameInput = React.createRef<TextInput>();
    this.lastnameInput = React.createRef<TextInput>();
    this.mobileInput = React.createRef<MobileInput>();
  }

  toggleAuthModal = () => {
    this.props.onClose();
  };

  handleSubmit = () => {
    if (this.state.showLogin) {
      if (
        this.emailInput.current?.isValid() &&
        this.passwordInput.current?.isValid()
      ) {
        const email = this.emailInput.current?.getValue();
        const password = this.passwordInput.current?.getValue();
        this.props.signinUser({ email, password }).then(response => {
          if (response.success) {
            this.toggleAuthModal();
          }
        });
      }
    } else if (this.state.showForgotPassword) {
      if (this.emailInput.current?.isValid()) {
        const data = {
          email: this.emailInput.current.getValue()
        };
        console.log(data);
      }
    } else if (this.state.showSignUp) {
      const isEmailValid = this.emailInput.current?.isValid();
      const isPasswordValid = this.passwordInput.current?.isValid();
      const isFirstNameValid = this.firstnameInput.current?.isValid();
      const isLastNameValid = this.lastnameInput.current?.isValid();
      const isMobileValid = this.mobileInput.current?.isValid();
      if (
        isEmailValid &&
        isPasswordValid &&
        isFirstNameValid &&
        isLastNameValid &&
        isMobileValid
      ) {
        const data = {
          email: this.emailInput.current?.getValue(),
          password: this.passwordInput.current?.getValue(),
          last_name: this.lastnameInput.current?.getValue(),
          first_name: this.firstnameInput.current?.getValue(),
          mobile: this.mobileInput.current?.getValue()
        };
        this.props.signinUser(data).then(response => {
          if (response.success) {
            this.toggleAuthModal();
          }
        });
      }
    }
  };
  handleLogin = () => {
    this.setState({
      ...this.state,
      showForgotPassword: false,
      showLogin: true,
      showSignUp: false
    });
  };
  handleSignUp = () => {
    this.setState({
      ...this.state,
      showForgotPassword: false,
      showLogin: false,
      showSignUp: true
    });
  };
  handleForgotPassword = () => {
    this.setState({
      ...this.state,
      showForgotPassword: true,
      showLogin: false,
      showSignUp: false
    });
  };
  renderSignUp = () => {
    return (
      <div>
        {this.renderSocialLogins()}
        <TextInput
          ref={this.firstnameInput}
          customClass={'name-input'}
          validations={FIRSTNAME_VALIDATIONS}
          placeholder={'FirstName'}
          label={'FirstName'}
          value={this.state.firstName}
        />
        <TextInput
          ref={this.lastnameInput}
          customClass={'name-input'}
          validations={LASTNAME_VALIDATIONS}
          placeholder={'LastName'}
          label={'LastName'}
          value={this.state.lastName}
        />
        <TextInput
          ref={this.emailInput}
          customClass={'email-input'}
          validations={EMAIL_VALIDATIONS}
          placeholder={'Email'}
          label={'Email'}
          value={this.state.email}
        />
        <TextInput
          ref={this.passwordInput}
          customClass={'password-input'}
          validations={PASSWORD_VALIDATIONS}
          placeholder={'Password'}
          label={'Password'}
          value={this.state.password}
        />
        <MobileInput
          ref={this.mobileInput}
          customClass={'mobile-input'}
          validations={MOBILE_VALIDATIONS}
          placeholder={'Phone'}
          label={'Phone'}
          value={this.state.mobile}
        />
        <div className="link-wrapper">
          <p onClick={this.handleLogin}>Login</p>
          <p onClick={this.handleForgotPassword}>Forgot Password</p>
        </div>
      </div>
    );
  };
  renderForgotPassword = () => {
    return (
      <div>
        <TextInput
          ref={this.emailInput}
          customClass={'email-input'}
          validations={EMAIL_VALIDATIONS}
          placeholder={'Email'}
          label={'Email'}
          value={this.state.email}
        />
        <div className="link-wrapper">
          <p onClick={this.handleLogin}>Login</p>
          <p onClick={this.handleSignUp}>Sign Up</p>
        </div>
      </div>
    );
  };
  renderSocialLogins = () => {
    return (
      <div className="social-wrapper">
        <div className="fb">
          <span>
            <img src={facebooklogo.default} />
          </span>
          <span className="title">Facebook</span>
        </div>
        <div className="gplus">
          <span>
            <img src={googlelogo.default} />
          </span>
          <span className="title">Google</span>
        </div>
      </div>
    );
  };
  renderLogin = () => {
    return (
      <div>
        {this.renderSocialLogins()}
        <TextInput
          ref={this.emailInput}
          customClass={'email-input'}
          validations={EMAIL_VALIDATIONS}
          placeholder={'Email'}
          label={'Email'}
          value={this.state.email}
        />
        <PasswordInput
          ref={this.passwordInput}
          customClass={'password-input'}
          validations={PASSWORD_VALIDATIONS}
          placeholder={'Password'}
          label={'Password'}
          value={this.state.password}
        />
        <div className="link-wrapper">
          <p onClick={this.handleSignUp}>SignUp</p>
          <p onClick={this.handleForgotPassword}>Forgot Password</p>
        </div>
      </div>
    );
  };
  render() {
    const customParentClass = this.state.showForgotPassword
      ? 'forgot-password'
      : this.state.showLogin
      ? 'login-wrapper'
      : 'signup-wrapper';
    const customHeaderClass = this.state.showForgotPassword
      ? 'header-forgot-password'
      : this.state.showLogin
      ? 'header-login-wrapper'
      : 'header-signup-wrapper';
    const header = modalHeaders[customParentClass];
    return (
      <>
        <Modal
          customClass={customParentClass}
          isCloseOnOutSideClick={false}
          onClose={this.toggleAuthModal}
          position={'center'}
          header={header}
          customHeaderClass={customHeaderClass}
          isShowCloseIcon={true}
        >
          {this.state.showLogin ? <div>{this.renderLogin()}</div> : null}
          {this.state.showForgotPassword ? (
            <div>{this.renderForgotPassword()}</div>
          ) : null}
          {this.state.showSignUp ? <div>{this.renderSignUp()}</div> : null}
          <Button
            customClass={'auth-submit'}
            title={'Continue'}
            onClick={this.handleSubmit}
          />
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state: IState) {
  return {};
}
export default hot(module)(
  connect(mapStateToProps, {
    signinUser
  })(Auth)
);
