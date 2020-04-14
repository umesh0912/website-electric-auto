import React, { useState, useRef } from 'react';
import Button from './../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import { connect } from 'react-redux';
import { signinUser } from './../../actions/index';

import './signin.scss';

import { EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS } from './../../constants';
import Password from '../common/Password/PasswordInput';

function SignIn(props) {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<Password>(null);

  const submit = () => {
    const data = {
      email: emailInput && emailInput.current && emailInput.current.getValue(),
      password:
        passwordInput &&
        passwordInput.current &&
        passwordInput.current.getValue(),
    };
    props.signinUser(data).then((response) => {
      if (response.success) {
        props.history.push('/');
      }
    });
  };

  return (
    <div>
      <div className="sign-container container">
        <div className="row">
          <div className="col-sm-12 form-group">
            <TextInput
              ref={emailInput}
              value={email}
              onChange={emailChange}
              customClass=""
              prefixText={'Email'}
              validations={EMAIL_VALIDATIONS}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Password
              ref={passwordInput}
              value={password}
              onChange={passwordChange}
              customClass=""
              prefixText={'Password'}
              validations={PASSWORD_VALIDATIONS}
            />
          </div>
        </div>
        <Button
          customClass="btn btn-primary"
          title={'Submit'}
          onClick={submit}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { authenticated } = state;
  return { authenticated };
}

export default connect(mapStateToProps, { signinUser })(SignIn);
