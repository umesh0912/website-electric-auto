import * as React from 'react';
import { hot } from 'react-hot-loader';
import Button from './../Button/Button';
import TextInput from './../TextInput/TextInput';
import { connect } from 'react-redux';
import { subscribeUser } from './../../../actions/index';

import './subscribe.scss';

interface IState {
  email: string;
}
const EMAIL_VALIDATIONS = [
  { name: 'required', message: 'Please enter your email.' },
  {
    name: 'email',
    message: 'Oh. Looks like that email is not valid. Check again?'
  }
];

class Subscribe extends React.Component<any, IState> {
  private textInput: React.RefObject<TextInput>;

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.textInput = React.createRef<TextInput>();
  }

  handleClick = () => {
    const isValid = this.textInput.current && this.textInput.current.isValid();
    if (isValid) {
      const email = this.textInput.current && this.textInput.current.getValue();
      this.props.subscribeUser({
        subscriber: { email }
      });
    }
  };
  handleChange = () => {};

  render() {
    return (
      <section className="subscribe-wrapper">
        <h1>Health Tips & Discounts</h1>
        <p className="desc">
          Subscribe to our newsletter to get discounts and tips to stay healthy.{' '}
        </p>
        <article>
          <TextInput
            ref={this.textInput}
            value={this.state.email}
            onChange={this.handleChange}
            placeholder={'your@email.com'}
            validations={EMAIL_VALIDATIONS}
          />
          <Button title={'Subscribe'} onClick={this.handleClick} />
        </article>
      </section>
    );
  }
}

export default hot(module)(connect(null, { subscribeUser })(Subscribe));
