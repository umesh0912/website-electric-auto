import * as React from 'react';
import FacebookLogin from 'react-facebook-login';
declare let __FB_APP_ID: any;
import './social.scss';
interface IProps {
  customClass?: string;
}

class FacebookAuthLogin extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      autoLoad: false,
    };
  }

  responseFacebook = () => {
  };

  handleClick = () => {
    this.setState({
      autoLoad: true,
    });
  };

  render() {
    const { customClass = '' } = this.props;
    return (
      <div className={`${customClass}`}>
        <FacebookLogin
          appId={`${__FB_APP_ID}`}
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onClick={this.handleClick}
          textButton={'Facebook'}
          cssClass={'fb-btn'}
        />
      </div>
    );
  }
}

export default FacebookAuthLogin;
