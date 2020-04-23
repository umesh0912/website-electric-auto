import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
declare let __GOOGLE_APP_ID: any;

interface IProps {
  customClass?: string;
}

class GoogleAuthLogin extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  responseFailure = () => {
  };

  responseSuccess = () => {
  };

  render() {
    const { customClass = '' } = this.props;
    return (
      <div className={`${customClass}`}>
        <GoogleLogin
          clientId={`${__GOOGLE_APP_ID}`}
          buttonText="Login"
          onSuccess={this.responseSuccess}
          onFailure={this.responseFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleAuthLogin;
